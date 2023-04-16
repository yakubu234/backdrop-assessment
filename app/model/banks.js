const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const banks = new Schema({

    bank_id: {
        type: String,
        trim: true,
        required: true
    }, name: {
        type: String,
        trim: true,
        required: true
    },
    code: {
        type: String,
        trim: true,
        required: true,
    },
    long_code: {
        type: String,
        trim: true,

    },
    country: {
        type: String,
        trim: true,
        required: true,
    },
    currency: {
        type: String,
        trim: true,
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    },


}, { timestamps: true });




module.exports = mongoose.model('banks', banks);