const truecallerUserLib = require('../lib/truecallerUserLib')
const authLib = require("../lib/authLib")
var express = require("express");
var router = express.Router();


// auth routes
router.get("/login", authLib.login)
router.get("/signup/verify", authLib.checkSignupOtp)
router.post("/signup", authLib.signUp)
// router.get("/forgotPassword",authLib.forgotPassword)

router.post("/findAndUpdate", truecallerUserLib.findAndUpdate)
router.get("/getAllRecords", truecallerUserLib.getAllRecords)
router.get("/getAllRecordsWithFilterPagination", truecallerUserLib.getAllRecordsWithFilterPagination)
router.get("/getRecordByNumber", truecallerUserLib.getRecordByNumber)
router.get('/deleteTruecallerUser', truecallerUserLib.deleteTruecallerUser)
router.post('/insertTruecallerUser', truecallerUserLib.insertTruecallerUser)
router.post('/insertManyTruecallerUsers', truecallerUserLib.insertManyTruecallerUsers)

module.exports = router;