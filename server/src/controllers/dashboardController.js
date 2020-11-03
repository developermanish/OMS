const dashboardHelper = require("../helpers/dashboard");

const getInfo = (orgid) => {
    console.log(orgid)
    let filters = {};
    filters = {
        _id: orgid
    };
    console.log(filters)
    return dashboardHelper.find(filters);
}

module.exports = {
    getInfo
}