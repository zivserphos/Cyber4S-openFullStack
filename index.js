const express = require("express");
const app = express();
const moment = require("moment");
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});
app.get("/info", (request, response) => {
  const people = persons.length;
  response.send(`Phonebook has info for ${people} people. \n ${new Date()}`); //need to add moment
});
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = persons.find((person) => person.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});
app.post("/api/persons", (request, response) => {
  console.log(request.body);
  const person = request.body;
  person.id = getRandomInt(999);
  console.log(person);
  if (person) {
    console.log(persons);
    persons.push(person);
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
