const find_all_feed = require("./accessor/find_all_feeds");
const find_all_feed_by_account = require("./accessor/find_all_feeds_by_account");

// trả về tất cả các feed theo index và tài khoản người dùng cho trước
async function view_feeds(index, uploader_id) {
    if (uploader_id)
        // khi có yêu cầu xem bài viết của một user cụ thể thì
        // trả về bài viết của mỗi user đó
        return await find_all_feed_by_account(index, uploader_id)
    // khi không có thì trả về tất cả bài viết theo index
    return await find_all_feed(index)
}

module.exports = view_feeds