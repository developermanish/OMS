import fetch from "./fetch";

export const addChild = async (orgid, obj) => {
    const result = await fetch("POST", "/child/add", {
        body: {
            orgid: orgid,
            ...obj
        }
    });
    if (result.status !== 201) {
        return {
            message: result.message
        };
    }
    return result;
}

export const getChild = async (orgid) => {
    const result = await fetch("POST", "/child/get", {
        body: {
            orgid: orgid
        }
    });
    if (result.status !== 200) {
        return { message: result.message };
    }
    return result;
}