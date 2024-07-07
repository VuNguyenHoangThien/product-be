const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  name: String,
  newDocument: String,
  price: String
});

module.exports = mongoose.model('data-2', userSchema)
