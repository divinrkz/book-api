const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { getEnum } = require('../utils/common.util');
const Joi = require('joi');
Joi.objectId = require("joi-objectid")(Joi);

const authorSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true, 
        unique: true
    },
    coverImage: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    },
    publishedAt: {
        type: Date,
        requried: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        unique: true,
        required: true
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
        title: Joi.string().required(),
        description: Joi.string().required(),
        ISBN: Joi.string().required(),
        totalPages: Joi.number().required(),
        authorId: Joi.objectId().required(),
        publishedAt: Joi.date().required()
    }

    return Joi.validate(data, schema);

}


module.exports = {
    Author,
    validate
}