const express = require("express");
const morgan = require("morgan");
var uuid = require("node-uuid");
morgan.token("id", function getId(req) {
  return req.id;
});

const app = express();

app.use(express.json());
app.use(assignBody);
app.use(morgan(":method :url :status :response-time :id"));

function assignBody(req, res, next) {
  req.id = JSON.stringify(req.body);
  next();
}

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
    name: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const generateId = () => {
  const maxId = Math.random() * 999999999;
  return maxId;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({ error: "name missing" });
  } else if (!body.number) {
    return res.status(400).json({ error: "number missing" });
  }
  const existPerson = persons.filter((person) => person.name === body.name);

  if (existPerson.length !== 0) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  res.json(person);
});

app.get("/info", (req, res) => {
  const message = `Phonebook has info for ${persons.length} people`;
  const date = new Date();
  res.send(`
  <p>${message}</p>
  <p>${date}</p>
  `);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
