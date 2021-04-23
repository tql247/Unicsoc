const update_feed = require("./accessor/update_feed");
const make_image_obj = require("../utils/make_image_obj");

async function edit_feed(feed_content) {
    try {
        const image = make_image_obj(feed_content.image)

        const new_content = {
            _id: feed_content._id,
            content: feed_content.content,
            image: image,
            embed_url: feed_content.embed_url
        }

        return await update_feed(new_content)
    } catch (e) {
        throw e
    }
}

module.exports = edit_feed
