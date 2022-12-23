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
    //checking if given phone number already exists in DB 
    let duplicateRecord = await asyncDbLib.getOneDocumentByFilter(truecallerUserModel, { phone: req.body.phone })
    logger.debug("duplicate Record is ", duplicateRecord)
    if (duplicateRecord) {
      res.status(409).json(duplicateRecord);
    }
    else {
      const result = await asyncDbLib.createDocument(truecallerUserModel, data)
      logger.debug(result)
      res.status(200).json(result)
    }
  }
  catch (err) {
    logger.error(err)
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
    logger.error(err)
    res.status(500).json(err)
  }
}

//function to return all records
module.exports.getAllRecords = async (req, res) => {
  logger.debug("request query =", req.query);
  let filter = {
    $and: [
      { name: { $regex: req?.query?.name, $options: "i" } },
      { phone: { $regex: req?.query?.phone, $options: "i" } },
      { location: { $regex: req?.query?.location, $options: "i" } },
      { email: { $regex: req?.query?.email, $options: "i" } },
    ]
  };
  truecallerUserModel.paginate(
    filter, { page: req?.query?.page|| 1, limit: req?.query?.limit|| 10, sort: { "updatedAt": -1 } },
    (err, result) => {
      if (err) {
        logger.error(err)
        res.status(500).json(err);
      }
      else {
        logger.info(result)
        res.status(200).json(result);
      }
    }
  )
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
    logger.error(err)
    res.status(500).json(err);
  }
}
