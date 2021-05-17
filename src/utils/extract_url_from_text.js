// trích xuất địa chỉ url video trên youtube trong văn bản text
// của người dùng khi đăng bài
function extract_url_from_text(text) {
    const url = text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/g)
    if (url)
        // do địa chỉ video bình thường không thể hiển thị
        // trên trang web nên cần biến đổi đế có thể 'embed'
        // tức là phát video trên trang web mà không cần
        // mở trang mới
        return url[0].replace('/watch?v=','/embed/')
    return null
}

module.exports = extract_url_from_text