const bcrypt = require('bcryptjs');

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function checkPassword(password, dbpass) {
    return await bcrypt.compare(password, dbpass);
}

module.exports = {
    hashPassword,
    checkPassword
};