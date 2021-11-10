import "./styles.scss";
import axios from "axios";

async function addContact(event) {
  event.preventDefault();
  const label = document.getElementById("resultdiv");
  try {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const number = document.getElementById("number").value;
    const token = document.getElementById("token").value;
    if (
      validateFirstName(firstName) &&
      validateLastName(lastName) &&
      validateNumber(number)
    ) {
      label.style.display = "block";
      label.innerText = "Loading...";
      const response = await axios.post("/api/persons", {
        name: firstName + " " + lastName,
        number: number,
        token: token,
      });
      console.log(firstName, lastName);
      label.innerText = `Added ${firstName} ${lastName} Successfuly`;
      setTimeout(() => {
        label.style.display = "none";
        label.innerText = "";
      }, 3 * 1000);
    }
  } catch (error) {
    label.style.display = "none";
    const errorDiv = document.getElementById("errordiv");
    errorDiv.style.display = "block";
    errorDiv.innerText = `${error.response.data.error}`;
    setTimeout(() => {
      errorDiv.style.display = "none";
      errorDiv.innerText = "";
    }, 3 * 1000);
  }
}

const addButton = document.getElementById("addButton");
addButton.addEventListener("click", addContact);
console.log(addButton);

function validateFirstName(name) {
  if (/^[a-zA-Z]/.test(name)) {
    return true;
  }
  console.log("First name is not invaid");
  return false;
}

function validateLastName(name) {
  if (/^[a-zA-Z]/.test(name)) {
    return true;
  }
  console.log("Last name is not invaid");
  return false;
}

function validateNumber(number) {
  if (number.length <= 11 && number.length >= 7) {
    return true;
  }
  console.log("Number is not invaid");
  return false;
}
