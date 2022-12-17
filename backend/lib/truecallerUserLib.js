const logger = require("../utils/logger").getLogForLib();
const truecallerModel = require("../db/models/truecallerUserModel")
const asyncDblib = require("./asyncDbLib")

//function to return all records
module.exports.getAllRecords = async (req, res) => {
  try {
    const allrecords = await asyncDblib.getAllDocumentsWithFilter(truecallerModel, {})
    logger.debug("allrecords =",allrecords)
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
    const data = await asyncDblib.getOneDocumentByFilter(truecallerModel, filter);
    logger.debug("data is ",data)
    res.status(200).json(data)
  }
  catch (err) {
    res.status(500).json(err);
  }
}
