const Child = require("../models/child");

const insert = (obj) => {
    const newData = new Child(obj);
    return newData.save();
}

const find = (filters) => {
    const orgid = filters.orgid ? filters.orgid : '';
    console.log(orgid);
    return Child.find(orgid)
        .populate('state')
        .exec();
}


module.exports = {
    insert,
    find
}