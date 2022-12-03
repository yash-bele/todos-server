const mongoose = require('mongoose');

const task = new mongoose.Schema({
  id: String,
  title: String,
});

const todo = new mongoose.Schema({
  id: String,
  title: String,
  tasks: [task],
});

const user = new mongoose.Schema({
  name: String,
  email: String,
  pass: String,
  todos: [todo],
});

module.exports = mongoose.model('user', user);
