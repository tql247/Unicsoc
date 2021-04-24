const add_new_feed = require("./accessor/add_feed");

async function post_feed(feed) {
    try {
        let image = null

        const new_feed = {
            content: feed["content"],
            image: image,
            embed_url: feed["embed_url"],
            uploader_id: feed["uploader_id"]
        }

        await add_new_feed(new_feed)

        return "await add_new_feed(new_feed)"
    } catch (e) {
        throw e
    }
}

module.exports = post_feed


// const imbase64 = Buffer.from(image.data).toString('base64')
// res.render('index', {image: image})
