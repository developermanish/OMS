const State = require("../models/state");

const insert = (obj) => {
    const newData = new State(obj);
    return newData.save();
}

const find = (filters) => {
    const orgid = filters.orgid ? filters.orgid : '';
    console.log(orgid);
    return State.find(orgid);
}

module.exports = {
    insert,
    find
}