function extract_url_from_text(text) {
    const url = text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/g)
    if (url)
        return url[0].replace('/watch?v=','/embed/')
    return null
}

module.exports = extract_url_from_text