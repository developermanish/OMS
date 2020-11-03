const districtHelper = require("../helpers/district");
const resStatus = require("../constants/responseStatus");

const addDistrict = (obj) => {
    return districtHelper.insert(obj);
}

const getDistrict = (orgid) => {
    console.log(orgid)
    let filters = {};
    filters = {
        orgid
    };
    return districtHelper.find(filters);
}

const getDistrictByStateId = (orgid, stateid) => {
    let filters = {};
    filters.query = {
        orgid,
        stateid
    };
    return districtHelper.findById(filters);
}

module.exports = {
    addDistrict,
    getDistrict,
    getDistrictByStateId
}