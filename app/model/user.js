const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    first_name: {
        type: String,
        trim: true,
        required: true,
    },
    last_name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        match: /.+\@.+\..+/,
        unique: [true, 'Email must be unique']
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    is_verified: {
        type: String,
        trim: true,
        enum: ['unverified', 'verified'],
        default: 'unverified'
    }
}, { timestamps: true });

module.exports = mongoose.model('user', UserSchema);