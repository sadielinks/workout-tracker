const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');


const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const db = require('./models')

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true
});

app.use(require("./routes/api.js"));
app.use(require("./routes/homeroutes.js"));

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}!!!!`);
});