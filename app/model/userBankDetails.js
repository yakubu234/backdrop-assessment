const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const userBankDetails = new Schema({
    account_number: {
        type: String,
        trim: true,
        required: true,
        unique: [true, 'Blog title must be unique']
    },
    account_name: {
        type: String,
        trim: true,
        required: true
    },
    bank_name: {
        type: String,
        trim: true,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    status: {
        type: String,
        trim: true,
        enum: ['unverified', 'verified'],
        default: 'unverified'
    },

}, { timestamps: true });



userBankDetails.virtual('userBankDetails', {
    ref: 'user', //The Model to use
    localField: 'user_id', //Find in Model, where localField 
    foreignField: '_id', // is equal to foreignField
});

userBankDetails.set('toObject', { virtuals: true });
userBankDetails.set('toJSON', { virtuals: true });

module.exports = mongoose.model('user_bank_details', userBankDetails);