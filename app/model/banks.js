const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const banks = new Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },
    code: {
        type: String,
        trim: true,
        required: true,
    },

}, { timestamps: true });




module.exports = mongoose.model('banks', banks);