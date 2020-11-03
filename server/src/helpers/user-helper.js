const User = require("../models/user");

function findOne(filters) {
    const query = filters.query ? filters.query : {};
    const select = filters.select ? filters.select : {};
    console.log(query);

    return User
        .findOne(query)
        .select(select)
        .exec();
}

function update(filters) {
    console.log("Before call");
    console.log(filters);
    console.log("this");
    const user = filters.user ? filters.user : {};
    const updateUser = filters.updateUser ? filters.updateUser : {};
    console.log(user);
    console.log(updateUser);
    return user.update(updateUser);
}

module.exports = {
    findOne,
    update
};
