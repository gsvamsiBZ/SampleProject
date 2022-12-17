const truecallerUserModel = require('../db/models/truecallerUserModel')
const asyncDbLib = require('../lib/asyncDbLib')
const logger = require("../utils/logger").getLogForLib();

// insert function 
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
    res.status(200).json(result)
  }
  catch(err){
    logger.debug(err)
    res.status(500).json(err)
  }
}
// delete function
module.exports.deleteTruecallerUser = async(req,res) => {
  try{
    let query = {
      phone : req.body.phone
    }
    const result = await asyncDbLib.deleteDocument(truecallerUserModel,query)
    logger.debug(result)
    res.status(200).json(result)
  }
  catch(err){
    logger.debug(err)
    res.status(500).json(err)
  }
}


  
