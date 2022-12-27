const truecallerUserLib = require('../lib/truecallerUserLib')

var express = require("express");
var router = express.Router();

router.post("/findAndUpdate", truecallerUserLib.findAndUpdate)
router.get("/getAllRecords", truecallerUserLib.getAllRecords)
router.get("/getAllRecordsWithFilterPagination", truecallerUserLib.getAllRecordsWithFilterPagination)
router.get("/getRecordByNumber", truecallerUserLib.getRecordByNumber)
router.get('/deleteTruecallerUser', truecallerUserLib.deleteTruecallerUser)
router.post('/insertTruecallerUser', truecallerUserLib.insertTruecallerUser)
router.post('/insertManyTruecallerUsers',truecallerUserLib.insertManyTruecallerUsers)

module.exports = router;