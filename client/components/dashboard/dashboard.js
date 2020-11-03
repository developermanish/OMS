import React, { useEffect, useState } from "react";
import { getOrgInfo } from "../../services/auth";
import {FaChild, FaHome } from "react-icons/fa";
import{ GiTeacher} from "react-icons/gi";

import { getOrgDetails } from "../../services/dashboard";
const dashboard = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchState() {
            const token = localStorage.getItem('token');
            const data = await getOrgInfo(token);
            const orgid = data._id;
            const result = await getOrgDetails(orgid);
            if (result.data) {
                setData(result.data);
            }
        }
        fetchState();
    }, [])
    return (
        <div >
            {data &&
                <div className="flex justify-between p-8 info" >
                    <div><span className="font-bold text-lg info-heading">Name:</span> <span className="info-detail">{data.firstname + " " + data.lastname}</span></div>
                    <div><span className="font-bold text-lg info-heading">Organization:</span> <span className="info-detail">{data.organization}</span></div>
                    <div><span className="font-bold text-lg info-heading">Designation:</span> <span className="info-detail">{data.designation}</span></div>
                </div>
            }
            <div>
                <img src="/img5.jpg" style={{ marginTop: "5px" }}  width="100%" />
            </div>
            <div className="banner-wrapper">
                <div className="banner-heading">
                    <h1>Help us get 200,000 Kids Safely and Permanently Home.</h1>
                </div>
                <div className="banner">
                    <div>
                        <div className="banner-icon"><FaChild /></div>
                        <div className="banner-text">Children’s lives improved</div>
                    </div>
                    <div>
                        <div className="banner-icon"><GiTeacher /></div>
                        <div className="banner-text">Government workers and childcare providers trained</div>
                    </div>
                    <div>
                        <div className="banner-icon"><FaHome/></div>
                        <div className="banner-text">Children reunited with families</div>
                    </div>
                </div>
                <div className="initiative">
                    <div className="initiative-heading">
                        <h2>OUR CORE INITIATIVES</h2>
                    </div>
                    <div className="initiative-content">
                        <div>
                            <img src="/img1.jpg" width="500px" height="400px"/>
                            <h6>Ensure that Every Child Thrives</h6>
                        </div>
                        <div>
                            <img src="/img2.jpg" width="500px" height="400px"/>
                            <h6>Ensure that Every Child Thrives</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="graph">
                <div className="graph-image">
                    <img src="/img3.png" height="500px" width="800px"/>
                </div>
                <div className="graph-content">
                    <h3>47% increase in Thrive ScaleTM scores with children we directly support</h3>
                </div>
            </div>
            <div>
                <img src="/img4.jpg" width="100%" />
            </div>
        </div>
    )

}
export default dashboard;