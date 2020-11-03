import React, { useState, useReducer } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

import TextInput from "../../common/TextInput";
import Button from "../../common/Button";
import { signUp } from "../../../services/auth";

function signUpReducer(state, action) {
    const { type, field, value } = action;

    if (type === "ON_CHANGE") {
        return {
            ...state,
            [field]: value
        };
    }
    return state;
}

const signUpInitState = {
    firstname: "",
    lastname: "",
    organization: "",
    designation: "",
    email: "",
    password: "",
    verify: ""
};

// TODO: Validations, error messages and loaders
const SignUpForm = ({ onSucess }) => {
    const [state, dispatch] = useReducer(signUpReducer, signUpInitState);
    const {
        firstname, lastname, organization, designation, email, password, verify
    } = state;

    const [isPasswordObsure, setIsPasswordObsure] = useState(false);
    const [error, setError] = useState({ field: "", message: "" });

    const isInputValid = (values) => {
        if (values.firstname === "") {
            setError({ field: "firstname", message: "Enter your first Name." });
        } else if (values.lastname === "") {
            setError({ field: "lastname", message: "Enter your last Name." });
        } else if (values.organization === "") {
            setError({ field: "organization", message: "Enter your Organization Name." });
        } else if (values.designation === "") {
            setError({ field: "designation", message: "Enter your Designation." });
        } else if (values.email === "") {
            setError({ field: "email", message: "Enter your email." });
        } else if (values.password === "") {
            setError({ field: "password", message: "Enter your password." });
        } else if (values.verify === "") {
            setError({ field: "verify", message: "Enter your password again." });
        } else if (values.password !== values.verify) {
            setError({ field: "notMatch", message: "Password do not match." });
        } else {
            return true;
        }

        return false;
    };

    const handleSubmitForm = async (signUpObject) => {
        if (isInputValid(signUpObject)) {
            const result = await signUp(signUpObject);
            if (!result) {
                onSucess();
            } else {
                console.log(result); // eslint-disable-line
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
            <div className="flex mb-2 w-full">
                <div className="w-1/2 pr-2">
                    <TextInput
                        type="text"
                        id="firstname"
                        name="firstname"
                        required
                        autoComplete="off"
                        label="firstname"
                        value={firstname}
                        onChange={(e) => onChange(e)}
                        error={error.field === "firstname" && error.message}
                    />
                </div>
                <div className="w-1/2 pl-2">
                    <TextInput
                        type="text"
                        id="lastname"
                        name="lastname"
                        required
                        autoComplete="off"
                        label="lastname"
                        value={lastname}
                        onChange={(e) => onChange(e)}
                        error={error.field === "lastname" && error.message}
                    />
                </div>
            </div>
            <div className="mb-2">
                <TextInput
                    type="text"
                    id="organization"
                    name="organization"
                    label="organization"
                    required
                    value={organization}
                    autoComplete="off"
                    onChange={(e) => onChange(e)}
                    error={error.field === "organization" && error.message}
                />
            </div>
            <div className="mb-2">
                <TextInput
                    type="text"
                    id="designation"
                    name="designation"
                    label="designation"
                    required
                    value={designation}
                    autoComplete="off"
                    onChange={(e) => onChange(e)}
                    error={error.field === "designation" && error.message}
                />
            </div>
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
            <div className="mb-2">
                <TextInput
                    type="password"
                    id="verify"
                    name="verify"
                    label="confirm password"
                    required
                    value={verify}
                    autoComplete="off"
                    onChange={(e) => onChange(e)}
                    error={(error.field === "verify" || error.field === "notMatch") && error.message}
                />
            </div>
            <div className="my-4">
                <Button kind="solid" onClick={() => { handleSubmitForm(state); }}>
                    sign up
        </Button>
            </div>
        </form>
    );
};

export default SignUpForm;
