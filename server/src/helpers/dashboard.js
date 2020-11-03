const User = require("../models/user");

const find = (filters) => {
    const _id = filters._id ? filters._id : '';
    console.log(_id);
    return User.findById(_id);
}

module.exports = {
    find
}