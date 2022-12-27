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

// function to insert multiple records 
module.exports.insertManyTruecallerUsers = async (req,res) => {
  try{
    console.log(req.body)
    console.log(typeof req.body[0].phone)
    const result = await asyncDbLib.insertMultipleDocuments(truecallerUserModel,req.body)
    logger.debug(result)
    res.status(200).json("ok")
  }
  catch(err){
    //Checking whether the error is due to the insertion of duplicates
    if(err.code == 11000){
      console.log("duplicate values")
      res.status(409).json(err)
    }
    else{
      logger.error(err.code)
      res.status(500).json(err)
    }
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
  try {
    const allRecords = await asyncDbLib.getAllDocumentsWithFilter(truecallerUserModel, {})
    logger.debug("allrecords =", allRecords)
    res.status(200).json(allRecords)
  }
  catch (err) {
    logger.error(err)
    res.status(500).json(err);
  }
}

//function to return records with filter and pagination
module.exports.getAllRecordsWithFilterPagination = async (req, res) => {
  logger.debug("request query =", req.query);
  let filter = {
    $and: [
      { name: { $regex: req?.query?.name, $options: "i" } },
      { phone: { $regex: req?.query?.phone, $options: "i" } },
      { location: { $regex: req?.query?.location, $options: "i" } },
      { email: { $regex: req?.query?.email, $options: "i" } },
    ]
  };
  //Getting limited records from db for the required required page 
  truecallerUserModel.paginate(
    filter, { page: req?.query?.page || 1, limit: req?.query?.limit || 10, sort: { "updatedAt": -1 } },
    (err, result) => {
      if (err) {
        logger.error(err)
        res.status(500).json(err);
      }
      else {
        logger.debug(result)
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

//function to find a document and update it 
module.exports.findAndUpdate = async (req, res) => {
  try {
    let data = req.body;
    let filter = { phone: data.oldPhone }
    let duplicateRecord = false
    if (data.oldPhone != data.phone) {
      //checking if updated phone number already exits in DB
      duplicateRecord = await asyncDbLib.getOneDocumentByFilter(truecallerUserModel, { phone: req?.body?.phone })
      logger.debug("duplicate Record is ", duplicateRecord)
    }
    if (duplicateRecord) {
      res.status(409).json(duplicateRecord);
    }
    else {
      try {
        const result = await asyncDbLib.findOneDocumentByFilterAndUpdate(truecallerUserModel, filter, data)
        logger.debug("result is ", result)
        res.status(200).json(result)
      }
      catch (err) {
        logger.error(err)
        res.status(500).json(err)
      }
    }
  }
  catch (err) {
    logger.error(err)
    res.status(500).json(err)
  }
}