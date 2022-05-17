const {User, validate, validateUpdate} = require('../models/user.model');
const { hashPassword } = require('../utils/common.util');
const {EUserType} = require('../enums');
const { APIResponse } = require('../config/APIResponse.config');


const getAll = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).send(APIResponse.success(users));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};

const getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send(APIResponse.fail(null, 'NOT FOUND')); 

        return res.status(200).send(APIResponse.success(user));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};


const create = async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(APIResponse.fail(error.details[0].message, 'VALIDATION ERROR')); 

        req.body.password = await hashPassword(req.body.password);
        req.body.userType = EUserType.ADMIN;

        const user = new User(req.body);

        const saved = await user.save();

        return res.status(200).send(APIResponse.success(saved));
    } catch (err) {
        console.error(err);
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};


const update = async (req, res) => {
    try {
        const {error} = validateUpdate(req.body);
        if (error) return res.status(400).send(APIResponse.fail(error.details[0].message, 'VALIDATION ERROR')); 


        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send(APIResponse.fail(null, 'NOT FOUND'));  

        user.names = req.body.names;
        user.username = req.body.username;
        user.nationalId = req.body.nationalId;

        const updated = await user.save();

        return res.status(200).send(APIResponse.success(updated));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};


const deleter = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send(APIResponse.fail(null, 'NOT FOUND'));  

        const deleted = await User.findByIdAndDelete(user._id);

        return res.status(200).send(SUCCESS_RESPONSE(null, 'Deleted Successfully'));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};




module.exports = {
    getAll, getById, create, update, deleter
}