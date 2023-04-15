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
    password: {
        type: String,
        required: true
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
    }
}, { timestamps: true });

// encrypt password before saving document
UserSchema.pre('save', function (next) {
    let user = this

    if (!user.isModified('password')) return next()

    // hash the password 
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
        if (err) return next(err)

        //override the text password with the hashed one
        user.password = hash
        next()
    })
})



module.exports = mongoose.model('user', UserSchema);