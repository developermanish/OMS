import fetch from "./fetch";

export const getOrgDetails = async (orgid) => {
    const result = await fetch("POST", "/dashboard/get", {
        body: {
            orgid: orgid
        }
    });

    if (result.status !== 200) {
        return { message: result.message };
    }
    return result;
}