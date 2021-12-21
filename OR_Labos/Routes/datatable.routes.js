const { openDelimiter } = require('ejs');
var express = require('express');
var router = express.Router();
var baza = require('../db/database');
var path = require('path');
const openapi = require('../openapi.json');

router.get('/', function (req, res) {
    res.render('../views/datatable.ejs');
})

router.get('/data', async function (req, res) {
    var sql = `SELECT * FROM pive JOIN vrstapakiranja ON vrstapakiranja.idpakiranja = pive.idpakiranja ORDER BY idpive`;
    try {
        const data = (await baza.query(sql, [])).rows;
        if(data.length === 0) {
            res.status(404).json({
                status: "404",
                message: "Podaci nisu pronađeni!",
                response: null
            });
        }
        else{
            res.status(200).json({
                status: "200",
                message: "Dohvaćeni podaci o pivi",
                response: data
            });
        }
    }
    catch(err) {
        res.status(404).json({
            status: "404",
            message: "Podaci nisu pronađeni!",
            response: null
        });    
    }
});

router.get('/details/:idpive', async function (req, res) {
    var sql = `SELECT * FROM pive JOIN vrstapakiranja ON vrstapakiranja.idpakiranja = pive.idpakiranja 
            WHERE idpive = ${req.params.idpive} ORDER BY idpive`;
    try {
        const data = (await baza.query(sql, [])).rows;
        if(data.length === 0) {
            res.status(404).json({
                status: "404",
                message: "Podaci nisu pronađeni!",
                response: null
            });
        }
        else{
            res.status(200).json({
                status: "200",
                message: "Dohvaćeni podaci o pivi",
                response: data
            });
        }
    }
    catch(err) {
        console.error(err);
        res.status(404).json({
            status: "404",
            message: "Podaci nisu pronađeni!",
            response: null
        });
    }
});

router.post('/new', async function (req, res) {
    var form = req.body;
    var id;
    var sqlId = `SELECT idpive FROM pive ORDER BY idpive DESC LIMIT 1`;
    try {
        id = (await baza.query(sqlId, [])).rows[0].idpive;
    }
    catch(err) {
        console.error(err);
    }
    id += 1;
    var vrstaPakiranja;
    var vrstaPakiranjaId;
    var sqlVrstaPakiranja = `SELECT * FROM vrstapakiranja WHERE materijal = '${form.materijal}' AND velicina = '${form.velicina}'`;
    try {
        vrstaPakiranja = (await baza.query(sqlVrstaPakiranja, [])).rows[0];
    }
    catch(err) {
        console.error(err);
    }
    if(vrstaPakiranja === null || vrstaPakiranja === undefined) {
        var sqlIdPakiranja = `SELECT * FROM vrstapakiranja ORDER BY idpakiranja DESC LIMIT 1`;
        try {
            vrstaPakiranjaId = (await baza.query(sqlIdPakiranja, [])).rows[0].idpakiranja;
            vrstaPakiranjaId += 1;
            var sqlInsertVrstaPakiranja = `INSERT INTO vrstapakiranja VALUES (${vrstaPakiranjaId}, '${form.materijal}', '${form.velicina}')`;
            await baza.query(sqlInsertVrstaPakiranja, []);
        }
        catch(err) {
            console.error(err);
        }
    }
    else {
        vrstaPakiranjaId = vrstaPakiranja.idpakiranja;
    }
    var sqlInsertForm = `INSERT INTO pive VALUES (${id}, '${form.naziv}', '${form.postalkohola}', '${form.boja}', '${form.vrsta}', 
        '${form.distributerzarh}', '${form.drzporjekla}', '${form.envrijednost100ml}', ${vrstaPakiranjaId}, '${form.pivovara}')`;
    await baza.query(sqlInsertForm, []);
    res.status(201).json({
        status: "201",
        message: "Dodan novi zapis!",
        response: id
    });
});

router.delete('/delete/:idpive', async function(req, res) {
    var sql = `DELETE FROM pive WHERE idpive = ${req.params.idpive}`;
    try {
        var statusDelete = await baza.query(sql, []);
        if(statusDelete.rowCount !== 0) {
            res.status(200).json({
                status: "200",
                message: "Podatak je izbrisan!",
                response: req.params.idpive
            });
        }
        else {
            res.status(404).json({
                status: "404",
                message: "Podatak nije pronađen!",
                response: null
            });
        }
    }
    catch(err) {
        res.status(404).json({
            status: "404",
            message: "Podatak nije pronađen!",
            response: null
        });
    }
});

router.put('/edit/:idpive', async function(req, res) {
    form = req.body;
    var sqlIdVrstaPakiranja = `SELECT * FROM vrstapakiranja WHERE materijal = '${form.materijal}' AND velicina = '${form.velicina}'`;
    var idVrstePakiranja;
    try {
        idVrstePakiranja = (await baza.query(sqlIdVrstaPakiranja, [])).rows[0];
        if(idVrstePakiranja !== null && idVrstePakiranja !== undefined) {
            idVrstePakiranja = idVrstePakiranja.idpakiranja;
        }
        else{
            var sqlIdStarihPakiranja = `SELECT * FROM vrstapakiranja ORDER BY idpakiranja DESC LIMIT 1`;
            idVrstePakiranja = (await baza.query(sqlIdStarihPakiranja, [])).rows[0].idpakiranja;
            idVrstePakiranja += 1;
            var sqlNovaVrstaPakiranja = `INSERT INTO vrstapakiranja VALUES (${idVrstePakiranja}, '${form.materijal}', '${form.velicina}')`;
            await baza.query(sqlNovaVrstaPakiranja, []);
        }
    }
    catch(err) {
        console.error(err);
    }
    var sql = `UPDATE pive SET naziv = '${form.naziv}', postalkohola = '${form.postalkohola}', boja = '${form.boja}', vrsta = '${form.vrsta}',
        distributerzarh = '${form.distributerzarh}', drzporjekla = '${form.drzporjekla}', envrijednost100ml = '${form.envrijednost100ml}',
        idpakiranja = ${idVrstePakiranja}, pivovara = '${form.pivovara}' WHERE idpive = ${req.params.idpive};`
    try {
        var statusEdit = await baza.query(sql, []);
        if(statusEdit.rowCount !== 0) {
            res.status(200).json({
                status: "200",
                message: "Podatak je uređen!",
                response: req.params.idpive
            });
        }
        else {
            res.status(404).json({
                status: "404",
                message: "Podatak nije pronađen!",
                response: null
            });
        }
        
    }
    catch(err) {
        res.status(404).json({
            status: "404",
            message: "Podatak nije pronađen!",
            response: null
        });
    }
});

router.get('/pive/nazivi', async function(req, res) {
    var sql = `SELECT DISTINCT naziv FROM pive ORDER BY naziv`;
    try {
        const data = (await baza.query(sql, [])).rows;
        if(data.length === 0) {
            res.status(404).json({
                status: "404",
                message: "Podaci nisu pronađeni!",
                response: null
            });        
        }
        else{
            res.status(200).json({
                status: "200",
                message: "Podaci su pronađeni!",
                response: data
            });
        }
    }
    catch(err) {
        res.status(404).json({
            status: "404",
            message: "Podaci nisu pronađeni!",
            response: null
        });
    }
});
router.get('/pive/pakiranja', async function(req, res) {
    var sql = `SELECT * FROM vrstapakiranja ORDER BY idpakiranja`;
    try {
        const data = (await baza.query(sql, [])).rows;
        if(data.length === 0) {
            res.status(404).json({
                status: "404",
                message: "Podaci nisu pronađeni!",
                response: null
            });
        }
        else{
            res.status(200).json({
                status: "200",
                message: "Podaci su pronađeni!",
                response: data
            });
        }
    }
    catch(err) {
        res.status(404).json({
            status: "404",
            message: "Podaci nisu pronađeni!",
            response: null
        });
    }
});
router.get('/pive/last', async function(req, res) {
    var sql = `SELECT * FROM pive JOIN vrstapakiranja ON vrstapakiranja.idpakiranja = pive.idpakiranja ORDER BY idpive DESC LIMIT 1`;
    try {
        const data = (await baza.query(sql, [])).rows;
        if(data.length === 0) {
            res.status(404).json({
                status: "404",
                message: "Podatak nije pronađen!",
                response: null
            });
        }
        else{
            res.status(200).json({
                status: "200",
                message: "Podaci su pronađeni!",
                response: data
            });
        }
    }
    catch(err) {
        res.status(404).json({
            status: "404",
            message: "Podatak nije pronađen!",
            response: null
        });
    }
});
router.get('/openapi', async function(req, res){
    res.send(openapi);

});

module.exports = router;
