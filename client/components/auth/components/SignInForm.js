import React, { useState, useReducer } from "react";
import Link from "next/link";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

import TextInput from "../../common/TextInput";
import Button from "../../common/Button";
import { signIn } from "../../../services/auth";


function signInReducer(state, action) {
    const { type, field, value } = action;
    if (type === "ON_CHANGE") {
        return {
            ...state,
            [field]: value
        };
    }
    return state;
}

const signInInitState = {
    email: "",
    password: ""
};

const SignInForm = ({ onSuccess }) => {
    const [state, dispatch] = useReducer(signInReducer, signInInitState);
    const {
        email, password
    } = state;

    const [isPasswordObsure, setIsPasswordObsure] = useState(false);
    const [error, setError] = useState({ field: "", message: "" });

    const isInputValid = (values) => {
        if (values.email === "") {
            setError({ field: "email", message: "Enter your email." });
        } else if (values.password === "") {
            setError({ field: "password", message: "Enter your password." });
        } else {
            return true;
        }

        return false;
    };

    const handleSubmitForm = async (signInObject) => {
        if (isInputValid(signInObject)) {
            const result = await signIn(signInObject);
            if (!result) {
                onSuccess();
            } else {
                console.log(result); //eslint-disable-line
            }
        }
    };

    const onChange = (e) => {
        if (error.field === e.target.name) {
            setError({ field: "", message: "" });
        }
        dispatch({ type: "ON_CHANGE", field: e.target.name, value: e.target.value });
    };

    return (
        <form>
            <div className="mb-2">
                <TextInput
                    type="email"
                    id="email"
                    name="email"
                    label="email"
                    required
                    value={email}
                    autoComplete="off"
                    onChange={(e) => onChange(e)}
                    error={error.field === "email" && error.message}
                />
            </div>
            <div className="mb-2 relative">
                <TextInput
                    type={isPasswordObsure ? "text" : "password"}
                    id="password"
                    name="password"
                    label="password"
                    required
                    value={password}
                    autoComplete="off"
                    onChange={(e) => onChange(e)}
                    error={error.field === "password" && error.message}
                />
                <div className="absolute cursor-pointer" style={{ right: "16px", top: "54%" }} onClick={() => setIsPasswordObsure(!isPasswordObsure)} role="button" tabIndex="0">
                    {isPasswordObsure ? <IoMdEye /> : <IoMdEyeOff />}
                </div>
            </div>

            <div className="my-4">
                <Button kind="solid" onClick={() => { handleSubmitForm(state); }}>
                    sign in
        </Button>
            </div>
        </form>
    );
};

export default SignInForm;
