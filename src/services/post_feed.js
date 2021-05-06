const add_new_feed = require("./accessor/add_feed");
const extract_url_from_text = require("../utils/extract_url_from_text");
const make_image_obj = require("../utils/make_image_obj");

async function post_feed(feed) {
    try {
        const image = await make_image_obj(feed.image)
        const extract_url = extract_url_from_text(feed["content"])
        const new_feed = {
            content: feed["content"].trim() || " ",
            image: image,
            uploader_id: feed["uploader_id"],
            embed_url: extract_url
        }

        return await add_new_feed(new_feed)
    } catch (e) {
        throw e
    }
}

module.exports = post_feed


// const imbase64 = Buffer.from(image.data).toString('base64')
// res.render('index', {image: image})
