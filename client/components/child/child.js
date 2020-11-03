import React, { useState, useEffect } from "react";
import Router from "next/router"

import Button from "../common/Button";
import { IoIosArrowRoundBack } from "react-icons/io";

import { getOrgInfo } from "../../services/auth";
import { getState } from "../../services/state";
import { getChild } from "../../services/child";
import { getDistrict } from "../../services/district";


const child = () => {
    const [stateData, setStateData] = useState([]);
    const [districtData, setDistrictData] = useState([]);
    const [data, setData] = useState([]);
    const [tab, setTab] = useState("all");
    const [childId, setChildId] = useState();
    const handleChildForm = () => {
        Router.push("/addChild")
    }

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('token');
            const data = await getOrgInfo(token);
            const orgid = data._id;
            const resultDistrict = await getDistrict(orgid);
            if (resultDistrict.data) {
                setDistrictData(resultDistrict.data);
            }
            const resultState = await getState(orgid);
            if (resultState.data) {
                setStateData(resultState.data);
            }
            const result = await getChild(orgid);
            if (result.data) {
                setData(result.data);
            }
        }
        fetchData()
    }, [])

    const handleAction = (id) => {
        console.log("I am clicked")
        setChildId(id);
        setTab("Specific");
    }

    const handleBack = () => {
        setTab("all");
    }
    return (
        <div>
            {tab == "all" &&
                <div className="">
                    <div className=" mt-10 mx-10" style={{ maxWidth: '10%' }}>
                        <Button kind="solid" style={{ borderRadius: '5px' }} onClick={() => handleChildForm()}>Add Child</Button>

                    </div>
                    {
                        console.log(stateData)
                    }
                    {
                        console.log(districtData)
                    }
                    <div className="flex self-center justify-center mt-10">

                        <table class="table-auto">
                            <thead>
                                <tr className="bg-gray-500">
                                    <th class="px-4 py-2">Name</th>
                                    <th class="px-4 py-2">Sex</th>
                                    <th class="px-4 py-2">Date of Birth</th>
                                    <th class="px-4 py-2">Father's Name</th>
                                    <th class="px-4 py-2">Mother's Name</th>
                                    <th class="px-4 py-2">State</th>
                                    <th class="px-4 py-2">District</th>
                                    <th class="px-4 py-2">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.map(child => (
                                        <tr className="bg-gray-100">
                                            <td class="border px-4 py-2">{child.name}</td>
                                            <td class="border px-4 py-2">{child.sex}</td>
                                            <td class="border px-4 py-2">{child.dob}</td>
                                            <td class="border px-4 py-2">{child.fatherName}</td>
                                            <td class="border px-4 py-2">{child.motherName}</td>
                                            <td class="border px-4 py-2">
                                                {
                                                    child.stateid && stateData.map((state) => (
                                                        <div>
                                                            {child.stateid == state._id ? state.name : ''}
                                                        </div>
                                                    ))
                                                }
                                            </td>
                                            <td class="border px-4 py-2">
                                                {
                                                    child.districtid && districtData.map((district) => (
                                                        <div>
                                                            {child.districtid == district._id ? district.name : ''}
                                                        </div>
                                                    ))
                                                }
                                            </td>
                                            <td class="border px-4 py-2" ><Button kind="solid" style={{ borderRadius: '5px', padding: '1px' }} onClick={() => handleAction(child._id)}>View</Button></td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>}
            {
                tab == "Specific" &&
                <div>
                    {console.log(childId)}
                    {
                        data && data.map((child) => (
                            <div>
                                {
                                    child._id == childId ?
                                        <div className=" mt-40" style={{ border: "2px solid", boxShadow: "0px 2px 2px 2px" }}>
                                            <span className="cursor-pointer p-10" onClick={() => { handleBack() }}><IoIosArrowRoundBack size={40} /></span>
                                            <div className="flex py-20 justify-between justify-center self-center">
                                                <div className="flex flex-wrap mx-20">
                                                    <div className="ml-20">Name: <span className="mx-5">{child.name}</span></div>
                                                    <div className="ml-20">Mother's Name: <span className="mx-5">{child.motherName}</span></div>
                                                    <div className="ml-20">District: <span className="mx-5">

                                                        {
                                                            child.districtid && districtData.map((district) => (
                                                                child.districtid == district._id ? district.name : ''
                                                            ))
                                                        }
                                                    </span>
                                                    </div>
                                                </div>
                                                <div className="flex  flex-wrap mx-20">
                                                    <div className="mx-10">Sex: <span className="mx-5">{child.sex}</span></div>
                                                    <div className="mx-10">Father's Name: <span className="mx-5">{child.fatherName}</span></div>
                                                </div>
                                                <div className="flex  flex-wrap mx-20">
                                                    <div className="mx-10">Date Of Birth: <span className="mx-5">{child.dob}</span></div>
                                                    <div className="mx-10">State:
                                                    <span className="mx-5">

                                                            {
                                                                child.stateid && stateData.map((state) => (
                                                                    child.stateid == state._id ? state.name : ''
                                                                ))
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> : null
                                }
                            </div>
                        ))
                    }

                </div>
            }
        </div>
    )
}
export default child;