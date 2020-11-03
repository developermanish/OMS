const childHelper = require("../helpers/child");

const addChild = (obj) => {
    return childHelper.insert(obj);
}

const getChild = (orgid) => {
    console.log(orgid)
    let filters = {};
    filters = {
        orgid
    };
    return childHelper.find(filters);
}

module.exports = {
    addChild,
    getChild
}