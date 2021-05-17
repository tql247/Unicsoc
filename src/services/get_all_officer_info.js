const find_all_officer = require("./accessor/find_all_officer");

// lấy thông tin của tất cả phòng khoa
async function get_all_officer_info () {
    try {
        return await find_all_officer();
    }
    catch (e) {
        throw e
    }
}

module.exports = get_all_officer_info