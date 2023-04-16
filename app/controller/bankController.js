let PayStack = require('paystack-node')
const { NODE_ENV, PAYSTACK_SECRETE_KEY } = process.env
const paystack = new PayStack(PAYSTACK_SECRETE_KEY, NODE_ENV)
const bankModel = require('../model/banks');

async function fetch(req, res, next) {

    let bankData = [];

    await paystack.listBanks({
        currency: 'NGN'
    }).then((result) => {
        let { status, message, data } = result.body
        if (status === false) {
            throw new Error(message);
        }

        data.forEach(element => {
            detail = {
                bank_id: element.id,
                name: element.name,
                code: element.code,
                long_code: element.longcode,
                country: element.country,
                currency: element.currency,
                status: element.active
            }

            bankData.push(detail)
        });

        bankModel.insertMany(bankData).then(function () {

            res.status(200).json({
                status: "success",
                message: "seeded successfully",
                data: bankData
            })

        }).catch(function (error) {
            res.status(400).json({
                data: error
            })
        });


    }).catch((ex) => {
        console.error(ex);
        res.status(400).json({
            data: ex.message
        })
    })
}

async function list(req, res, next) {

    try {

        const banks = await bankModel.find();

        res.status(200).json({
            status: "success",
            message: "Fetched Successful!!!",
            data: banks
        });

    } catch (e) {
        fetch(req, res)
    }

}


module.exports = {
    fetch,
    list,
}