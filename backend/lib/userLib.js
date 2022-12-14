const userModel = require('../db/models/users');

//Function to add a user into DB
module.exports.addUser = async function (req, res) {
    try {
        let data = {
            user_name: req.body.user_name,
            city : req.body.city,
        }
        let newdata = userModel(data)
        await newdata.save()
        return res.status(200).json("done");
    } catch (error) {
        return res.status(500).json(error);
    }
};

//Function to get all users from DB
module.exports.getUsers = async function (req, res) {
    try {
        let data = await userModel.find()
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
};