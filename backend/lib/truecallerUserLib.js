// insert function 
// delete function
// get all records function
// get 1 record function
const truecallermodel=require("../db/models/truecallerUserModel")
const asyncDblib= require("./asyncDbLib")
module.exports.getAllRecords=async(req,res)=>{
    try{
             const allrecords=await asyncDblib.getAllDocumentsWithFilter(truecallermodel,{})
             console.log("getting all records ",allrecords)
             res.json(allrecords)
    }
    catch(error){
        res.status(500).json(error);
    }
}
module.exports.getRecordByNumber=async(req,res)=>{
    try{
        let phonenumber=req.query.phone 
        let filter={phone:phonenumber}
        const data=await asyncDblib.getOneDocumentByFilter(truecallermodel,filter);
        console.log("getting records with phone filter of ",filter,"and the data is ",data);
        res.json(data)
    }
    catch(error){
         res.status(500).json(error);
    }
}
