import React, { useState, useEffect } from "react";

import { IoIosArrowRoundForward, IoIosAdd, IoMdCheckmark } from "react-icons/io";

import { getState } from "../../services/state";
import { getOrgInfo } from "../../services/auth";
import { addDistrict, getDistrict } from "../../services/district";

const District = () => {
    const [district, setDistrict] = useState("");
    const [stateId, setStateId] = useState();
    const [orgId, setOrgId] = useState("");
    const [stateData, setStateData] = useState([]);
    const [districtData, setDistrictData] = useState([]);

    const handleAdd = async (district, stateId, orgId) => {
        const result = await addDistrict(district, stateId, orgId);
        if (result.status === 201) {
            //TODO reload page
            window.location.reload(false);
        }
    }

    useEffect(() => {
        async function fetchState() {
            const token = localStorage.getItem('token');
            const data = await getOrgInfo(token);
            const orgid = data._id;
            setOrgId(orgid)
            const result = await getState(orgid);
            if (result.data) {
                setStateData(result.data);
            }

        }
        fetchState();
    }, [])

    useEffect(() => {
        async function fetchDistrict() {
            const token = localStorage.getItem('token');
            const data = await getOrgInfo(token);
            const orgid = data._id;
            const result = await getDistrict(orgid);
            console.log(result)
            if (result.data) {
                setDistrictData(result.data);
            }
        }
        fetchDistrict();
    }, [])

    return (
        <div className=" justify-center flex flex-wrap">
            <div className="max-w-xs m-5  flex flex-row border-4 border-green-800 rounded-lg" style={{ height: "150px", width: "400px", border: '2px solid', borderColor: '#00b300' }}>
                <div className="justify-center flex self-center mx-5" style={{ border: '1px dotted', borderColor: '#00b300', borderRadius: '50%', padding: '15px' }} ><IoIosAdd size={30} /></div>
                <div>
                    {console.log(districtData)}
                    <div className="my-3 mx-5 max-w-xs">
                        <select onChange={(e) => {
                            setStateId(e.target.value)
                        }} >
                            <option value="none" default>Select State name</option>
                            {stateData && stateData.map(state => (
                                <option value={state._id} >{state.name}</option>
                            ))}

                        </select>
                    </div>
                    <div className="my-3 mx-5 max-w-xs">
                        <input className="border-0 border-b w-48 border-gray-700" type="text" name="state" autoComplete="off" placeholder="Enter District Name" style={{ borderColor: '#00b300' }} value={district} onChange={(e) => setDistrict(e.target.value)} />
                    </div>
                    <div className="my-3 mx-5">
                        <button className=" text-white shadow-none p-2 rounded-md" style={{ backgroundColor: "#00b300" }} onClick={() => handleAdd(district, stateId, orgId)}>Add District</button>
                    </div>
                </div>
            </div>


            {
                districtData && districtData.map((district) => (
                    <div key={district.id} className=" max-w-full m-5 p-0 flex flex-row border-4 border-green-800 rounded-lg " style={{ height: "150px", width: "400px", border: '2px solid', borderColor: '#00b300' }}>
                        <div className="justify-center  self-center mx-5" style={{ border: '1px dotted', borderColor: '#00b300', borderRadius: '50%', padding: '15px' }} ><IoMdCheckmark size={30} /></div>
                        <div>
                            <div className="my-3 mx-5 ">
                                {district.name}
                            </div>
                            <div className="my-3 mx-5 ">
                                {district.stateid && stateData.map((state) => (
                                    <div>
                                        {district.stateid == state._id ? state.name : ''}
                                    </div>
                                ))}
                            </div>
                            <div className="my-3 mx-5">
                                <button className=" text-white shadow-none px-2 rounded-md" style={{ backgroundColor: "#00b300" }} ><IoIosArrowRoundForward size={30} /></button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>

    );
}
export default District;