const find_cmt_by_id = require("./accessor/find_cmt_by_id");
const soft_delete_cmt = require("./accessor/soft_delete_comment");

async function delete_comment(comment_id, user_id) {
    try {
        const cmt = await find_cmt_by_id(comment_id)
        if (JSON.stringify(cmt["commenter"]) !== JSON.stringify(user_id)) {
            const err = new Error();
            err.name = 'Access Denies'
            err.message = 'You are not have permission'
            throw err
        }
        return await soft_delete_cmt(comment_id)
    } catch (e) {
        throw e
    }
}

module.exports = delete_comment

