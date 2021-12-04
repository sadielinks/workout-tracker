const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');


const PORT = process.env.PORT || 3001;

const app = express();
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const db = require('./models')

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workout", 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}
);

app.use(require("./routes/api.js"));
app.use(require("./routes/homeroutes.js"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!!!!`);
});