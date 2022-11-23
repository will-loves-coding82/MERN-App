const mongoose = require("mongoose")

const userTemplate = new mongoose.Schema({
    userName: {
        type:String,
        required: true,
        unique: true,
        minLength: 3
    },
    email: {
        type:String
    },
    password: {
        type:String,
        required: true,
        unique:true
    },
    date: {
        type:Date,
        default: Date.now
         
    }
})

module.exports = mongoose.model('users', userTemplate);
