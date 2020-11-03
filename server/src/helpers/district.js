const District = require("../models/district");

const insert = (obj) => {
    const newData = new District(obj);
    return newData.save();
}

const find = (filters) => {
    const orgid = filters.orgid ? filters.orgid : '';
    console.log(orgid);
    return District.find(orgid)
        .populate('state')
        .exec();
}

const findById = (filters) => {
    const query = filters.query ? filters.query : '';
    console.log(query);
    return District.find(query);
}

module.exports = {
    insert,
    find,
    findById
}