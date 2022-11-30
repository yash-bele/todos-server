const mongoose = require('mongoose');

const db = (db) => {
  return mongoose.connect(db);
};

module.exports = db;
