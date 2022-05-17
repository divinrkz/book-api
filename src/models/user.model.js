const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { EUserStatus, EUserType } = require('../enums');
const { getEnum } = require('../utils/common.util');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const userSchema = mongoose.Schema({
    names: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        enum: getEnum(EUserType),
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
userSchema.plugin(timestamps);
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        names: this.names,
        userType: this.userType
    }, SECRET_KEY);
};


const User = mongoose.model('User', userSchema);


const validate = (data) => {
    const schema = {
        names: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()
    }

    return Joi.validate(data, schema);

}


const validateUpdate = (data) => {
    const schema = {
        names: Joi.string().required(),
        email: Joi.string().email().required(),
    }

    return Joi.validate(data, schema);

}

const validateLogin = (data) => {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }

    return Joi.validate(data, schema);

}


module.exports = {
    User,
    validate,
    validateLogin,
    validateUpdate
}