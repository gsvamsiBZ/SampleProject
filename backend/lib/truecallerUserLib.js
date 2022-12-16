// insert function 
// delete function
// get all records function
// get 1 record function
const truecallerUserModel = require('../db/models/truecallerUserModel')
const asyncDbLib = require('../lib/asyncDbLib')
const logger = require("../utils/logger").getLogForDB();


module.exports.insertTruecallerUser = async(req,res) => {
  try{
    let data = {
      phone     : req.body.phone,
      name      : req.body.name,
      location  : req.body.location,
      email     : req.body.email
    }
    const result = await asyncDbLib.createDocument(truecallerUserModel,data)
    logger.debug(result)
    res.status(200)
  }
  catch(err){
    console.log(err)
    res.status(500)
  }
}

module.exports.deleteTruecallerUser = async(req,res) => {
  try{
    let query = {
      phone : req.body.phone
    }
    const result = await asyncDbLib.deleteDocument(truecallerUserModel,query)
    logger.debug(result)
    res.status(200)
  }
  catch(err){
    console.log(err)
    res.status(500)
  }
}


  
