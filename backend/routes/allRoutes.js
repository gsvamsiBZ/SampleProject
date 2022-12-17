const truecallerUserLib = require('../lib/truecallerUserLib')

var express = require("express");
var router = express.Router();

router.get("/getAllRecords",truecallerUserLib.getAllRecords)
router.get("/getRecordByNumber",truecallerUserLib.getRecordByNumber)
router.get('/deleteTruecallerUser',truecallerUserLib.deleteTruecallerUser)
router.post('/insertTruecallerUser',truecallerUserLib.insertTruecallerUser)

module.exports = router;
