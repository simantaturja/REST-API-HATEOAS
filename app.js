const express = require('express');

require('dotenv').config();

const app = express();

const mongoose = require('mongoose');

const storyRouter = require('./routes/storyRouter');

const mongoDbUrl = process.env.MONGOURI;

const connect = mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect.then((db) => {
  console.log('Connected successfully to the server', db);
}, (error) => console.log(error));

app.use(express.json());
app.use('/', storyRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});

module.exports = app;
