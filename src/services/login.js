const jwt = require('jsonwebtoken');
const find_account_by_email = require("./accessor/find_account_by_email");
const add_account = require("./accessor/add_account");
const update_account_token = require("./accessor/update_account_token");
const {check_password} = require("../utils/bcrypt");

// Dùng để tạo ra json web token với _id của người dùng ẩn bên trong
async function sign_token_to_user(acc) {
    const token = jwt.sign(
        {
            _id: acc["_id"]
        },
        process.env.JWT_KEY,
        {
            expiresIn: '2h',
        }
    );

    await update_account_token(acc.email, token)

    return token
}

// đăng nhập bằng tài khoản google
async function login_by_google(user) {
    try {
        // kiểm tra mail có phải email trường tdt hay không
//         if (!user.email.match("@student.tdtu.edu.vn")) {
//             const e = new Error()
//             e.status = 401
//             e.name = "Unauthorized"
//             e.message = 'Invalid email'
//             throw e
//         }

        // kiểm tra email đã tồn tại hay chưa
        let acc = await find_account_by_email(user.email);

        // nếu chưa thì tạo tài khoản mới với email này
        if (!acc) {
            const new_user = {
                email: user.email,
                password: '12345678',
                full_name: user.name,
                google_avatar: user.google_avatar,
                role: "student"
            }
            acc = await add_account(new_user)
        }

        return await sign_token_to_user(acc)
    } catch (e) {
        throw e
    }
}

// đăng nhập bằng tài khoản
async function login_by_account(user) {
    try {
        // kiểm tra email có trong hệ thống hay không
        let acc = await find_account_by_email(user.email);

        if (!acc) {
            const e = new Error();
            e.status = 401
            e.name = "Unauthorized"
            e.message = "Incorrect email or password"
            throw e
        }

        // kiểm tra mật khẩu có trùng khớp
        let verify = await check_password(user.password, acc["password"]);

        if (!verify) {
            const e = new Error();
            e.status = 401
            e.name = "Unauthorized"
            e.message = "Incorrect email or password"
            throw e
        }

        return await sign_token_to_user(acc)
    } catch (e) {
        throw e
    }
}

module.exports = {
    login_by_google,
    login_by_account,
    sign_token_to_user
}
