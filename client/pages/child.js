import React from "react";
import Head from "next/head";

import Child from "../components/child/child";
import Header from "../components/common/Header"

const childPage = () => (
    <div>
        <Head>
            <title>Child</title>
        </Head>
        <Header />
        <Child />
    </div>
)
export default childPage;