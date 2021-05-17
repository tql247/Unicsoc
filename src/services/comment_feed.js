const add_comment = require("./accessor/add_comment");

// dùng để bình luận một bài viết
async function comment_feed(comment) {
    try {
        const new_comment = {
            feed: comment["feed"],
            content: comment["content"].trim(),
            commenter: comment["commenter"]
        }
        return await add_comment(new_comment)
    } catch (e) {
        throw e
    }

}

module.exports = comment_feed