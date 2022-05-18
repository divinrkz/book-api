const bcrypt = require('bcryptjs');

const getEnum = (obj) => {
    return Object.keys(obj)
            .map((key) => {
                return obj[key];
            })
}


const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports = {
    getEnum,
    hashPassword
}