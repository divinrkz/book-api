const bcrypt = require('bcryptjs');

const getEnum = (obj) => {
    return Object.keys(obj)
            .map((key) => {
                return obj[key];
            })
}

const SUCCESS_RESPONSE = (data=null, message="") => {
    return {success: true, data, message, timestamp:new Date().getTime()};
}

const ERROR_RESPONSE = (err=null, message="INTERNAL SERVER ERROR") => {
    return {success: false, error: err, message, timestamp:new Date().getTime()};
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports = {
    getEnum,
    hashPassword,
    SUCCESS_RESPONSE,
    ERROR_RESPONSE
}