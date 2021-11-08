// import "./styles.scss";
// import "./images/background.jpeg";
// import axios from "axios";

// console.log("Hello World!");

// // async function deletePhone(event) {
// //   event.target.closest("LI").remove();
// //   const response = await axios.delete(`api/persons/${event.target.dataset.id}`);
// //   alert(response);
// // }

// async function phoneBookInfo(event) {
//   event.preventDefault();
//   const response = await axios.get(`http://localhost:3001/info`);
//   event.target.setAttribute("data-content", response.data);
// }

// document
//   .querySelector(".button-delete")
//   .addEventListener("click", (event) => deletePhone(event));

// document
//   .getElementById("info")
//   .addEventListener("click", (event) => phoneBookInfo(event));

import "./styles.scss";
import "./images/background.jpeg";
import axios from "axios";

const baseUrl = "http://localhost:3001/";
async function renderPhoneBook(persons) {
  const phoneBook = document.getElementById("phoneBook");
  try {
    for (let person of persons.persons) {
      // rightdiv build
      const callIcon = createElement("i", [], ["fas fa-phone"]);
      const deleteIcon = createElement("i", [], ["fas fa-minus-circle"]);
      const callBtn = createElement("button", [callIcon], ["button-call"]);
      const deleteBtn = createElement(
        "button",
        [deleteIcon],
        ["button-delete"],
        { "data-id": person.id },
        { click: deletePhone }
      );
      const rightDiv = createElement("div", [callBtn, deleteBtn]);
      //   left div build
      const span = createElement("span", [person.number]);
      const a = createElement("a", [person.name, span]);
      const leftDiv = createElement("div", [a]);
      const li = createElement("li", [leftDiv, rightDiv], [], {}, {});
      phoneBook.append(li);
    }
  } catch (error) {}
}
async function getDataBase() {
  const response = await axios.get(`${baseUrl}api/persons`);
  const persons = response.data;
  console.log(persons);
  renderPhoneBook(persons);
}
getDataBase();

async function deletePhone(event) {
  console.log(event.target.closest("LI"));
  event.target.closest("LI").remove();
  const response = await axios.delete(
    `${baseUrl}api/persons/${event.target.dataset.id}`
  );
}
function createElement(
  tagName,
  children = [],
  classes = [],
  attributes = {},
  eventListeners = {}
) {
  const element = document.createElement(tagName);
  for (const child of children) element.append(child);
  element.classList = classes.join(" ");
  for (const attr in attributes) element.setAttribute(attr, attributes[attr]);
  for (const event in eventListeners)
    element.addEventListener(event, eventListeners[event]);
  return element;
}
