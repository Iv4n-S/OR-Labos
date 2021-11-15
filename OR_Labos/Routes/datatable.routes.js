const { openDelimiter } = require('ejs');
var express = require('express');
var router = express.Router();
var baza = require('../db/database');
var filterOption;
var filter;

router.get('/', async function (req, res) {
    var sql = `SELECT * FROM pive JOIN vrstapakiranja ON vrstapakiranja.idpakiranja = pive.idpakiranja ORDER BY idpive`;
    try {
        const data = (await baza.query(sql, [])).rows;
    
    res.render('datatable', {
        title: 'Pive',
        data: data,
        linkActive: 'datatable'
    });
    }
    catch(err) {
        console.log(err);
    }
});

module.exports = router;
