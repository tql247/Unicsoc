const login = require("../services/login");
const { hash_password } = require("./bcrypt");

module.exports = {
    login,
    hash_password
}