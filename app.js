const express = require('express');
const cors = require('cors');
const errorHandler = require('./handlers/errorHandler');
const personsRouter = require('./routes/persons.js');
const infoRouter = require('./routes/infoRouter');
const app = express();
const path = require('path');
const morgan = require('morgan');
const morganHandler = require('./handlers/morgan');
const mongoose = require('mongoose');
const env = require('dotenv').config();
const password = process.env.PASSWORD;

const url = `mongodb+srv://ziv_serphos1:${password}@cluster0.zcgdd.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.connect(url);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

app.use(cors());
app.use(
  morganHandler,
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.use(express.json());

app.use('/', express.static(path.resolve('./dist')));

app.use('/api/persons', personsRouter);
app.use('/info', infoRouter);

app.get('/addContact', (req, res) => {
  res.sendFile(path.resolve('./dist/InfoPage.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'));
});

app.use('/', errorHandler);

module.exports = app;
