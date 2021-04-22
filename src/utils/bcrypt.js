const bcrypt = require('bcryptjs');

async function hash_password(password) {
    return await bcrypt.hash(password, 10);
}

async function check_password(password, hash_string) {
    return await bcrypt.compare(password, hash_string);
}

module.exports = {
    hash_password,
    check_password
};