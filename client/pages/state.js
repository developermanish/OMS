import React from "react";
import Head from "next/head";

import State from "../components/state/state";
import Header from "../components/common/Header"

const StatePage = () => (
    <div>
        <Head>
            <title>State</title>
        </Head>
        <Header />
        <div>
            <div className="state-heading">
                <h1>Working States</h1>
            </div>
        <State />
        </div>
    </div>
);

export default StatePage;