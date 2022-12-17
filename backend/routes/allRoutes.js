const msg = require('../lib/messageLib')
const userLib = require('../lib/userlib')
const truecallerUserLib = require('../lib/truecallerUserLib')

var express = require("express");
var router = express.Router();
router.get('/hello', function(req, res){
    res.send('Hello World');
});
router.get('/getMessage',msg.getMessage);
router.get('/get')
router.get('/deleteUser',truecallerUserLib.deleteTruecallerUser)
router.post('/insertUser',truecallerUserLib.insertTruecallerUser)

module.exports = router;
