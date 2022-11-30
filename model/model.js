const mongoose = require('mongoose');

const todo = mongoose.Schema({
  id: String,
  title: String,
});

const user = mongoose.Schema({
  name: String,
  email: String,
  pass: String,
  todos: [todo],
});

module.exports = mongoose.model('user', user);
