const jwt = require('jsonwebtoken');
const add_new_account = require("../accessor/add_new_account");
const find_account_by_email = require("../accessor/find_account_by_email");
const {check_password} = require("../utils/bcrypt");


async function login_by_google(user) {
    try {
        // if (!user.email.match("@student.tdt.edu.vn")) return {}

        let acc = await find_account_by_email(user.email);

        if (!acc) {
            acc = await add_new_account(
                {
                    email: user.email,
                    password: '12345678',
                    full_name: user.name,
                    role: "student"
                })
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