const mongoose = require("mongoose")

const signUpTemplate = new mongoose.Schema({
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
        unique:true,
        minLength: 6
    },
    date: {
        type:Date,
        default: Date.now
         
    }
})

//module.exports = mongoose.model('users', signUpTemplate);
