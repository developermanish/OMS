import fetch from "./fetch";

export const signUp = async (signUpObject) => {
    const result = await fetch("POST", "/signup", {
        body: { ...signUpObject }
    });
    console.log(result);
    if (result.status !== 201) {
        return { message: result.message };
    }
};

export const signIn = async (signInObject) => {
    const result = await fetch("POST", "/signin", {
        body: { ...signInObject }
    });
    console.log(result);
    localStorage.setItem('token', result.token);
    if (result.status !== 200) {
        return { message: result.message };
    }
};

export const logout = () => {
    localStorage.setItem('token', null);
};

export const checkToken = async (token) => {
    const result = await fetch("POST", "/token", {
        body: {
            token: token
        }
    });
    return result;
}

export const getOrgInfo = async (token) => {
    const result = await fetch("POST", "/info", {
        body: {
            token: token
        }
    });
    return result;
}