const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  name: String,
  document: String,
  price: String,
  image: String
});

module.exports = mongoose.model('data-2', userSchema)
