import fetch from "./fetch";

export const addDistrict = async (district, stateId, orgId) => {
    console.log(district, stateId, orgId)
    const result = await fetch("POST", "/district/add", {
        body: {
            name: district,
            stateid: stateId,
            orgid: orgId
        }
    });
    console.log(result)
    if (result.status !== 201) {
        return {
            message: result.message
        };
    }
    return result;
}

export const getDistrict = async (orgId) => {
    console.log(orgId)
    const result = await fetch("POST", "/district/get", {
        body: {
            orgid: orgId
        }
    });
    console.log(result)
    if (result.status !== 200) {
        return { message: result.message };
    }
    return result;
}

export const getDistrictByState = async (orgId, stateId) => {
    const result = await fetch("POST", "/district/getByStateId", {
        body: {
            orgid: orgId,
            stateid: stateId
        }
    });
    if (result.status !== 200) {
        return { message: result.message };
    }
    return result;
} 