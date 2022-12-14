var express = require("express");
var router = express.Router();
let userLib = require("../lib/userLib") 
router.get('/hello', function(req, res) {
    res.send('Hello World');
});
router.post('/addUser', userLib.addUser);
router.get('/user', userLib.getUsers);

module.exports = router;
