const update_feed = require("./accessor/update_feed");
const make_image_obj = require("../utils/make_image_obj");
const find_feed_by_id = require("./accessor/find_feed_by_id");
const extract_url_from_text = require("../utils/extract_url_from_text");

async function edit_feed(feed_content) {
    try {
        const feed = await find_feed_by_id(feed_content._id)

        if (JSON.stringify(feed["uploader_id"]._id) !== JSON.stringify(feed_content.uploader_id))
            return feed

        const image = make_image_obj(feed_content.image)
        const extract_url = extract_url_from_text(feed_content.content)

        const new_content = {
            _id: feed_content._id,
            content: feed_content.content,
            image: image,
            embed_url: extract_url
        }

        return await update_feed(new_content)
    } catch (e) {
        throw e
    }
}

module.exports = edit_feed
