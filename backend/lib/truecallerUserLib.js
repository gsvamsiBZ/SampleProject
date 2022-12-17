const truecallerUserModel = require('../db/models/truecallerUserModel')
const asyncDbLib = require('../lib/asyncDbLib')
const logger = require("../utils/logger").getLogForLib();

// function to insert a record 
module.exports.insertTruecallerUser = async (req, res) => {
  try {
    let data = {
      phone: req.body.phone,
      name: req.body.name,
      location: req.body.location,
      email: req.body.email
    }
    const result = await asyncDbLib.createDocument(truecallerUserModel, data)
    logger.debug(result)
    res.status(200).json(result)
  }
  catch (err) {
    logger.debug(err)
    res.status(500).json(err)
  }
}
// function to delete a record
module.exports.deleteTruecallerUser = async (req, res) => {
  try {
    let query = {
      phone: req.body.phone
    }
    const result = await asyncDbLib.deleteDocument(truecallerUserModel, query)
    logger.debug(result)
    res.status(200).json(result)
  }
  catch (err) {
    logger.debug(err)
    res.status(500).json(err)
  }
}

//function to return all records
module.exports.getAllRecords = async (req, res) => {
  try {
    const allrecords = await asyncDbLib.getAllDocumentsWithFilter(truecallerUserModel, {})
    logger.debug("allrecords =", allrecords)
    res.status(200).json(allrecords)
  }
  catch (err) {
    res.status(500).json(err);
  }
}

//function to return record with phone filter
module.exports.getRecordByNumber = async (req, res) => {
  try {
    let phonenumber = req.query.phone
    let filter = { phone: phonenumber }
    const result = await asyncDbLib.getOneDocumentByFilter(truecallerUserModel, filter);
    logger.debug("result is ", result)
    res.status(200).json(result)
  }
  catch (err) {
    res.status(500).json(err);
  }
}
