const userModel = require('../model/user');
const bcrypt = require('bcrypt');

function create(req, res, next) {
    userModel.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
    }).then(result => {

        res.status(201).json({
            "status": "success",
            "message": "User Registered Successfully",
            data: result
        })
    }).catch(err => {
        err.type = 'Identical Email'
        next(err)

    });
}

async function view(req, res, next) {

    try {

        const user = await userModel.findOne({ email: req.body.email })

        res.status(200).json({
            status: "success",
            message: "Login Successful!!!",
            data: user
        });

    } catch (e) {
        e.type = 'Incorrect Email'
        next(e)
    }

}




module.exports = {
    view,
    create,
}