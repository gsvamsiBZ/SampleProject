const truecallerUserLib = require('../lib/truecallerUserLib')

var express = require("express");
var router = express.Router();

router.get("/getallrecords",truecallerUserLib.getAllRecords)
router.get("/getrecordbynumber",truecallerUserLib.getRecordByNumber)
router.get('/deleteTruecallerUser',truecallerUserLib.deleteTruecallerUser)
router.post('/insertTruecallerUser',truecallerUserLib.insertTruecallerUser)

module.exports = router;
