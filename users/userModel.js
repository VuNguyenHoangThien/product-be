const mongoose = require('mongoose')

var loginSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
});

module.exports = mongoose.model('logins', loginSchema)
