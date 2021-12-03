const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const routes = require('./routes');
const path = require('path');
const app = express();


const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const Workout = require('./models/Workout')


app.listen(PORT, () => {
  console.log(`Running on port ${PORT}!!!!`);
});