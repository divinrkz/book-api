const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { getEnum } = require('../utils/common.util');
const Joi = require('joi');

const authorSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    authorNumber: {
        type: String,
        enum: getEnum(EEmployeeType)
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
authorSchema.plugin(timestamps);


const Author = mongoose.model('Author', authorSchema);


const validate = (data) => {
    const schema = {
        names: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        authorNumber: Joi.string().required()
    }

    return Joi.validate(data, schema);

}


const validateUpdate = (data) => {
    const schema = {
        names: Joi.string().required(),
        email: Joi.string().email().required(),
        authorNumber: Joi.string().required()
    }

    return Joi.validate(data, schema);

}




module.exports = {
    Author,
    validate,
    validateUpdate
}