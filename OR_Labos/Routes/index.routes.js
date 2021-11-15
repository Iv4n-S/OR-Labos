var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {
        title: 'Pive',
        linkActive: 'index'
    });
});
module.exports = router;