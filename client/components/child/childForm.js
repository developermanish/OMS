import React, { useState, useReducer, useEffect } from "react";
import Router from "next/router";

import TextInput from "../common/TextInput";
import Button from "../common/Button";

import { getState } from "../../services/state";
import { getOrgInfo } from "../../services/auth";
import { getDistrictByState } from "../../services/district";
import { addChild } from "../../services/child";

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
    name: "",
    sex: "",
    dob: "",
    fatherName: "",
    motherName: "",
    stateid: "",
    districtid: ""
};

const childForm = () => {
    const [childState, dispatch] = useReducer(signUpReducer, signUpInitState);
    const {
        name, sex, dob, fatherName, motherName, stateid, districtid
    } = childState;

    const [stateData, setStateData] = useState([]);
    const [districtData, setDistrictData] = useState([]);

    useEffect(() => {
        async function fetchState() {
            const token = localStorage.getItem('token');
            const data = await getOrgInfo(token);
            const orgid = data._id;
            const resultState = await getState(orgid);
            if (resultState.data) {
                setStateData(resultState.data);
            }

        }
        fetchState();
    }, [])

    const [error, setError] = useState({ field: "", message: "" });
    const isInputValid = (values) => {
        console.log(stateid)
        if (values.name === "") {
            setError({ field: "name", message: "Enter your Name." });
        } else if (sex === "") {
            return false;
        } else if (values.dob === "") {
            setError({ field: "dob", message: "Enter your Date of Birth." });
        } else if (values.fatherName === "") {
            setError({ field: "fatherName", message: "Enter your Father's Name." });
        } else if (values.motherName === "") {
            setError({ field: "motherName", message: "Enter your Mother's Name." });
        } else if (stateid === "") {
            return false;
        } else if (districtid === "") {
            return false;
        } else {
            return true;
        }

        return false;
    };

    const handleSubmitForm = async (obj) => {
        if (isInputValid(obj)) {
            const token = localStorage.getItem('token');
            const data = await getOrgInfo(token);
            const orgid = data._id;
            const result = await addChild(orgid, obj);
            if (result) {
                Router.push("/child");
            } else {
                console.log(result); // eslint-disable-line
            }
        }
        console.log(obj)
    };

    const onChange = (e) => {
        if (error.field === e.target.name) {
            setError({ field: "", message: "" });
        }
        dispatch({ type: "ON_CHANGE", field: e.target.name, value: e.target.value });
    };

    useEffect(() => {
        async function fetchDistrictByState() {
            const token = localStorage.getItem('token');
            const data = await getOrgInfo(token);
            const orgid = data._id;
            const resultDistrict = await getDistrictByState(orgid, stateid);
            if (resultDistrict.data) {
                setDistrictData(resultDistrict.data);
            }
        }
        fetchDistrictByState();

    }, [stateid])
    return (
        <form>
            <div className=" mb-2 ">
                <TextInput
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="off"
                    label="name"
                    value={name}
                    onChange={(e) => onChange(e)}
                    error={error.field === "name" && error.message}
                />

            </div>
            <div className="mb-4">
                <label className="text-sm mb-1 text-gray-700 font-medium uppercase">District*</label><br />
                <select className="bg-white w-full" required name="sex" value={sex} onChange={(e) => onChange(e)}
                    error={error.field === "sex" && error.message} >
                    <option value="none">Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

            </div>
            <div className="mb-2">
                <TextInput
                    type="date"
                    id="dob"
                    name="dob"
                    label="Date Of Birth"
                    required
                    value={dob}
                    autoComplete="off"
                    onChange={(e) => onChange(e)}
                    error={error.field === "dob" && error.message}
                />
            </div>
            <div className="mb-2">
                <TextInput
                    type="text"
                    id="fatherName"
                    name="fatherName"
                    label="father Name"
                    required
                    value={fatherName}
                    autoComplete="off"
                    onChange={(e) => onChange(e)}
                    error={error.field === "fatherName" && error.message}
                />
            </div>
            <div className="mb-2">
                <TextInput
                    type="text"
                    id="motherName"
                    name="motherName"
                    label="mother Name"
                    required
                    value={motherName}
                    autoComplete="off"
                    onChange={(e) => onChange(e)}
                    error={error.field === "motherName" && error.message}
                />
            </div>
            <div className="mb-2 mt-4">
                <label className="text-sm mb-1 text-gray-700 font-medium uppercase">STATE*</label><br />
                <select className="bg-white w-full" required name="stateid" value={stateid} onChange={(e) => onChange(e)}
                    error={error.field === "state" && error.message}>
                    <option value="none" default>Select State name</option>
                    {
                        stateData && stateData.map(state => (
                            <option value={state._id} >{state.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className="mb-4 mt-4">
                <label className="text-sm mb-1 text-gray-700 font-medium uppercase">District*</label><br />
                <select className="bg-white w-full" required name="districtid" value={districtid} onChange={(e) => onChange(e)}
                    error={error.field === "district" && error.message}>
                    <option value="none" default>Select District name</option>
                    {
                        districtData && districtData.map(district => (
                            <option value={district._id} >{district.name}</option>
                        ))
                    }
                </select>

            </div>
            <div className="my-4">
                <Button kind="solid" onClick={() => { handleSubmitForm(childState); }}>
                    Submit
                </Button>
            </div>
        </form>

    )
}
export default childForm;