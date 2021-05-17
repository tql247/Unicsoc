// Tạo ra object image với 2 thuộc tính là
// contentType: loại dữ liệu (jpg,png,...)
// data: hình ảnh lưu dưới dạng binary
// từ image_file: một object do thư viện multer trả về
async function make_image_obj(image_file) {
    if (!image_file) return null;
    if (!image_file.mimetype || !image_file.path) return null;

    const fs = require('fs');
    const image_data = fs.readFileSync(image_file.path);
    // chuyển file data sang binary
    const encode_image = image_data.toString('base64');
    const image_obj = {
        contentType: image_file.mimetype,
        data: new Buffer.from(encode_image, 'base64')
    };

    // Xoá image trong store sau khi đã xử lý
    await fs.unlinkSync(image_file.path)

    return image_obj
}

module.exports = make_image_obj