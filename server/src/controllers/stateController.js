const stateHelper = require("../helpers/state");
const resStatus = require("../constants/responseStatus");

const addState = (obj) => {
    return stateHelper.insert(obj);
}

const getState = (orgid) => {
    console.log(orgid)
    let filters = {};
    filters = {
        orgid
    };
    return stateHelper.find(filters);
}

module.exports = {
    addState,
    getState
}