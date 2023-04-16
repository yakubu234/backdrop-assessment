const express = require('express');
const router = express.Router();

const bankController = require(__basedir + '/app/controller/bankController')

router.get('/', (req, res) => {
    res.json({
        "name": "the backdrop task home page"
    })
});

router.get('/seed-bank', bankController.fetch);
router.get('/list-banks', bankController.list);

// router.post('blog/search', userController.authenticate);
module.exports = router;