const truecallerUserLib = require('../lib/truecallerUserLib')

var express = require("express");
var router = express.Router();

router.get('/deleteTruecallerUser',truecallerUserLib.deleteTruecallerUser)
router.post('/insertTruecallerUser',truecallerUserLib.insertTruecallerUser)

module.exports = router;
