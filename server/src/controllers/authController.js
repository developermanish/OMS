const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const log = require("../../config/logger");
const User = require("../models/user");
const userHelper = require("../helpers/user-helper");



async function UserRegistration(req, res) {
    const {
        firstname, lastname, organization, designation, email, password
    } = req.body;
    console.log("1");
    console.log(req.body);

    try {
        User.findOne({ email: email })
            .then((user) => {
                if (user) {
                    return res.status(403).send({ message: "User already exist" });
                }
                console.log("2");
                const newUser = new User({
                    firstname,
                    lastname,
                    organization,
                    designation,
                    email,
                    password
                });
                console.log("hey")
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        log.error(err);
                    }
                    bcrypt.hash(newUser.password, salt, (e, hash) => {
                        if (e) {
                            log.error(e);
                        }
                        newUser.password = hash;
                        newUser.save();
                        return res.status(201).send({ message: "User registered" });
                    });
                });
            })
            .catch((err) => {
                log.error(err);
                throw err;
            });
    } catch (error) {
        log.error(error);
        return res
            .status(500)
            .send({ message: "Error in creating user" });
    }
}

async function authenticateUser(req, res) {
    try {

        const { email, password } = req.body;
        let filters = {};
        filters.query = {
            email: email
        };
        const user = await userHelper.findOne(filters);
        if (!user) {
            return res
                .status(401)
                .send({ message: "User not found" });
        }
        const result = await bcrypt.compare(password, user.password);
        if (result === false) {
            return res
                .status(401)
                .send({ message: "Password is incorrect" });
        }
        let token = await jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: 300 });
        const oldData = user;
        user.token = token;
        filters = {
            user: oldData,
            updateUser: user
        }
        const updatedUser = await userHelper.update(filters);
        if (!updatedUser) {
            return res
                .status(400)
                .send({ message: "Unable to update user " });
        }
        return res
            .status(200)
            .send({
                message: "Success",
                token: token
            })

    } catch (err) {
        console.log(err);
    }

}

async function checkToken(req, res) {
    try {
        const { token } = req.body;
        const filters = {};
        filters.query = {
            token: token
        }
        const result = await userHelper.findOne(filters);
        console.log(result)
        if (!result) {
            return res
                .status(400)
                .send({ message: "authentication fail" })
        }
        return res
            .status(200)
            .send({
                message: "Success"
            })
    } catch (err) {
        console.log(err)
    }
}

async function getOrg(req, res) {
    try {

        const { token } = req.body;
        const filters = {};
        filters.query = {
            token: token
        }
        const result = await userHelper.findOne(filters);
        if (!result) {
            return res
                .status(400)
                .send({ message: "No organisation found" });
        }
        return res
            .status(200)
            .send(result);
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    UserRegistration,
    authenticateUser,
    checkToken,
    getOrg
};
