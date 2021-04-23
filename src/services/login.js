const jwt = require('jsonwebtoken');
const find_account_by_email = require("./accessor/find_account_by_email");
const add_account = require("./accessor/add_account");
const {check_password} = require("../utils/bcrypt");


async function login_by_google(user) {
    try {
        if (!user.email.match("@student.tdt.edu.vn")) {
            const e = new Error()
            e.status = 401
            e.name = "Unauthorized"
            e.message = 'Invalid email'
            throw e
        }

        let acc = await find_account_by_email(user.email);

        if (!acc) {
            const new_user = {
                email: user.email,
                password: '12345678',
                full_name: user.name,
                role: "student"
            }
            acc = await add_account(new_user)
        }

        const token = jwt.sign(
            {
                id: acc["_id"],
                email: acc["email"],
                full_name: acc["full_name"],
                password: acc["password"],
                role: "student"
            },
            process.env.JWT_KEY,
            {
                expiresIn: '2h',
            }
        );

        return {
            code: 202,
            message: "Accepted - Login success",
            token: token
        }
    } catch (e) {
        console.log(e)
        throw e
    }
}

async function login_by_account(user) {
    try {
        let acc = await find_account_by_email(user.email);

        if (!acc) {
            const e = new Error();
            e.status = 401
            e.name = "Unauthorized"
            e.message = "Incorrect email or password"
            throw e
        }

        let verify = await check_password(user.password, acc["password"]);

        if (!verify) {
            const e = new Error();
            e.status = 401
            e.name = "Unauthorized"
            e.message = "Incorrect email or password"
            throw e
        }

        const token = jwt.sign(
            {
                id: acc["_id"],
                email: acc["email"],
                full_name: acc["full_name"],
                password: acc["password"],
                role: "student"
            },
            process.env.JWT_KEY,
            {
                expiresIn: '2h',
            }
        );

        return {
            code: 202,
            message: "Accepted - Login success",
            token: token
        }
    } catch (e) {
        throw e
    }
}

module.exports = {
    login_by_google,
    login_by_account
}