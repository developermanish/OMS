import fetch from "./fetch";

export const addState = async (orgid, state) => {
    const result = await fetch("POST", "/state/add", {
        body: {
            orgid: orgid,
            name: state
        }
    });
    if (result.status !== 201) {
        return { message: result.message };
    }
    return result;
}

export const getState = async (orgid) => {
    const result = await fetch("POST", "/state/get", {
        body: {
            orgid: orgid
        }
    });
    if (result.status !== 200) {
        return { message: result.message };
    }
    return result;
}