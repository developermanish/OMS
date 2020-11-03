import React, { useState, useEffect } from "react";
import { IoIosArrowRoundForward, IoIosAdd, IoMdCheckmark } from "react-icons/io";

import { addState, getState } from "../../services/state";
import { getOrgInfo } from "../../services/auth";

const State = () => {
    const [state, setState] = useState("")
    const [data, setData] = useState([]);

    const handleAdd = async (state) => {
        const token = localStorage.getItem('token');
        const data = await getOrgInfo(token);
        const orgid = data._id;
        const result = await addState(orgid, state);
        console.log(result);
        if (result.status === 201) {
            // reload page
            window.location.reload(false);
        }
    }
    useEffect(() => {
        async function fetchState() {
            const token = localStorage.getItem('token');
            const data = await getOrgInfo(token);
            const orgid = data._id;
            const result = await getState(orgid);
            if (result.data) {
                setData(result.data);
            }

        }
        fetchState();
    }, [])
    return (
        <div className=" justify-center flex flex-wrap">
            <div className="max-w-xs m-5  flex flex-row border-4 border-green-800 rounded-lg" style={{ height: "150px", width: "900px", border: '2px solid', borderColor: '#00b300' }}>
                <div className="justify-center flex self-center mx-5" style={{ border: '1px dotted', borderColor: '#00b300', borderRadius: '50%', padding: '15px' }} ><IoIosAdd size={30} /></div>
                <div className="justify-center  self-center">
                    <div className="my-3 mx-5 max-w-xs">
                        <input className="border-0 border-b w-48 border-gray-700" type="text" name="state" autoComplete="off" placeholder="Enter State Name" style={{ borderColor: '#00b300' }} value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div className="my-3 mx-5">
                        <button className=" text-white shadow-none p-2 rounded-md" style={{ backgroundColor: "#00b300" }} onClick={() => handleAdd(state)}>Add State</button>
                    </div>
                </div>
            </div>
            {
                data && data.map((state) => (
                    <div key={state.id} className="max-w-xs m-5 p-5 flex flex-row border-4 border-green-800 rounded-lg " style={{ height: "150px", width: "900px", border: '2px solid', borderColor: '#00b300' }}>
                        <div className="justify-center flex self-center mx-5" style={{ border: '1px dotted', borderColor: '#00b300', borderRadius: '50%', padding: '15px' }} ><IoMdCheckmark size={30} /></div>
                        <div>
                            <div className="my-3 mx-5 max-w-xs">
                                {state.name}
                            </div>
                            <div className="my-3 mx-5">
                                <button className=" text-white shadow-none px-2 rounded-md" style={{ backgroundColor: "#00b300" }}><IoIosArrowRoundForward size={30} /></button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default State;