const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { getEnum } = require('../utils/common.util');
const Joi = require('joi');
Joi.objectId = require("joi-objectid")(Joi);

const ratingSchema = mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        unique: true,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
ratingSchema.plugin(timestamps);


const Rating = mongoose.model('Rating', ratingSchema);


const validate = (data) => {
    const schema = {
        bookId: Joi.objectId().required(),
        rating: Joi.number().required()
    }

    return Joi.validate(data, schema);

}

module.exports = {
    Rating,
    validate
}