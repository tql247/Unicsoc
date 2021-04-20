const connect = require("./connection");
const add_new_account = require("./add_new_account");
const add_new_notification = require("./add_new_notification");
const find_account_by_email = require("./find_account_by_email");
const get_all_notification = require("./get_all_notification");

module.exports = {
    connect,
    add_new_account,
    add_new_notification,
    find_account_by_email,
    get_all_notification
}