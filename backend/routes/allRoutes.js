var express = require("express");
var router = express.Router();
const truecallerUserLib=require("../lib/truecallerUserLib")
router.get('/hello', function(req, res) {
    res.send('Hello World');
});
router.get("/getallrecords",truecallerUserLib.getAllRecords)
router.get("/getrecordbynumber",truecallerUserLib.getRecordByNumber)
module.exports = router;
