const AccountModel = require("../models/Account");
const {hash_password} = require("../utils");
const connect = require("./connection");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

async function login(user) {
    try {
        await connect();
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
                email: user.email,
                full_name: user.name,
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

module.exports = login