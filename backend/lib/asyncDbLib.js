// DB QUERIES USING ASYNC
const logger = require("../utils/logger").getLogForDB();

//findone
exports.getOneDocumentByFilter = async function (model, filter) {
  logger.debug("finding a document in db with filter", filter)
  let data = await model.findOne(filter);
  return data;
};

//findOneAndUpdate
exports.findOneDocumentByFilterAndUpdate = async function (
  model,
  filter,
  update
) {
  logger.debug("finding a document with filter", filter,"and updating in db , update feilds",update)
  let data = await model.findOneAndUpdate(filter, update, {
    returnDocument: "after",
  });
  return data;
};

//findOneAndUpdate with upsert(if no document matches filter, MongoDB will insert one by combining filter and update)
exports.findOneDocumentByFilterAndUpdateUpsert = async function (
  model,
  filter,
  update
) {
  logger.debug("finding a document with filter", filter,"and updating in db , update feilds",update)
  let data = await model.findOneAndUpdate(filter, update, {
    returnDocument: "after",
    upsert: true
  });
  return data;
};

//findById
exports.getOneDocumentById = async function (model, id, select ) {
  logger.debug("finding a document with _id ",id, " with select fields ", select)
  let data = await model.findById(id,select);
  return data;
};

//findByIdAndUpdate
exports.findOneDocumentByIdAndUpdate = async function (model, id, update){
  logger.debug("finding a document with id", id,"and updating in db, update fields",update)
  let data = await model.findByIdAndUpdate(id , update, {
    returnDocument: "after",
  });
  return data;
}

//create one
exports.createDocument = async function (model,obj){
  logger.debug("Creating document",obj,"in model",model);
  let data = await model.create(obj);
  return data;
}

//create multiple
exports.insertMultipleDocuments = async function (model,arrayOfObj){
  logger.debug("Inserting array of objects",arrayOfObj,"in model",model);
  //ordered will be used to skip some records and to continue the process incase of any errors.
  let data = await model.insertMany(arrayOfObj,{ordered : false});
  return data;
}

//get Distinct values of a field 
exports.getDistinctValuesOfField = async function(model,field,filter){
  logger.debug("Getting distinct values of field",field,"from model",model,"with filter",filter);
  let data = await model.distinct(field,filter);
  return data;
}

//get Distinct values of a field sorted order
exports.getDistinctValuesOfFieldSorted = async function(model,field){
  logger.debug("Getting distinct values of field sorted",field,"from model",model);
  let data = await model.distinct(field).sort();
  return data;
}

//find with filter
exports.getAllDocumentsWithFilter = async function(model,filter,sort){
  logger.debug("Getting all documents from model",model,"with filter",filter);
  let data = await model.find(filter).sort(sort);
  return data;
}

//find with filter and selection
exports.getAllDocumentsWithFilterAndSelectionWithSort = async function(model,filter,selection,sort){
  logger.debug("Getting all documents from model",model,"with filter",filter,"and selection",selection);
  let data = await model.find(filter,selection).sort(sort);
  return data;
}

//getting doc with select and update
exports.getOneDocumentByFilterWithUpdateAndSelect = async function (model, filter, select, update) {
  logger.debug("finding a document in db with filter,select and updating", filter,select, update)
  let data = await model.findOneAndUpdate(filter,select,update);
  return data;
};

//deleting a record with filter
exports.deleteDocument = async function (model,filter){
  logger.debug("deleting document with filter",filter,"from the model",model)
  let result = await model.deleteOne(filter)
  return result;
}