const mongoose = require("mongoose")

const locationTemplate = new mongoose.Schema({
    username: {type:String},
    list: {type: Array}

});

module.exports = mongoose.model('myTable.locations', locationTemplate);