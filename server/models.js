const mongoose = require("mongoose")

const User = new mongoose.Schema({
    name:{type: String},
    login:{type: String, unique: true},
    password:{type: String}
})

const Package = new mongoose.Schema({
    name:{type: String},
    path:{type: String}
})

module.exports.User = mongoose.model("User", User)
module.exports.Package = mongoose.model("Package", Package)