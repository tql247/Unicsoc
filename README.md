# uni_social
### Ghi chú
Bài làm được thiết kế theo kiến trúc củ hành (onion structure),
nghĩa là các hàm không trực tiếp gọi xuống db để thực thi các tác vụ
mà phải thông qua các accessor.
Và các hàm tái sử dụng các accessor này để đảm bảo tính bảo mật,
an toàn và tiện dụng của hệ thống.
