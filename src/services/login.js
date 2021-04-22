const AccountModel = require("../models/Account");
const {hash_password} = require("../utils");
const connect = require("./connection");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {check_password} = require("../utils/bcrypt");


async function login_by_google(user) {
    try {
        await connect();
        // if (!user.email.match("@student.tdt.edu.vn")) return {}

        let acc = await AccountModel.findOne().where('email').equals(user.email).exec();

        if (!acc) {
            acc = await AccountModel.create(
                {
                    email: user.email,
                    password: await hash_password('12345678'),
                    full_name: user.name,
                    role: "student"
                }
            );
        }

        const token = jwt.sign(
            {
                id: acc._id,
                email: acc.email,
                full_name: acc.full_name,
                role: "student"
            },
            process.env.JWT_KEY,
            {
                expiresIn: '2h',
            }
        );

        await AccountModel.findOneAndUpdate({email: acc.email}, {
            token: token,
        });

        return {
            code: 202,
            message: "Accepted - Login success",
            token: token
        }
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

async function login_by_account(user) {
    try {
        await connect();
        let acc = await AccountModel.findOne().where('email').equals(user.email).exec();

        if (!acc) {
            const e = new Error();
            e.status = 401
            e.name = "Unauthorized"
            e.message = "Incorrect email or password"
            throw e
        }

        let verify = check_password(acc.password, user.password)

        if (!verify) {
            const e = new Error();
            e.status = 401
            e.name = "Unauthorized"
            e.message = "Incorrect email or password"
            throw e
        }

        const token = jwt.sign(
            {
                id: acc._id,
                email: acc.email,
                full_name: acc.full_name,
                role: "student"
            },
            process.env.JWT_KEY,
            {
                expiresIn: '2h',
            }
        );

        await AccountModel.findOneAndUpdate({email: acc.email}, {
            token: token,
        });

        return {
            code: 202,
            message: "Accepted - Login success",
            token: token
        }
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = {
    login_by_google,
    login_by_account
}