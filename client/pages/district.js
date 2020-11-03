import React from "react";
import Head from "next/head";

import District from "../components/district/district";
import Header from "../components/common/Header"

const DistrictPage = () => (
    <div>
        <Head>
            <title>District</title>
        </Head>

        <Header />
        <div>
            <div className="district-heading">
                <h1>Working District</h1>
            </div>
            <District />
        </div>
    </div>
);

export default DistrictPage;