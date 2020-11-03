import React from "react";
import Head from "next/head";

import SignUp from "../components/auth/SignUp";

const SignUpPage = () => (
    <div>
        <Head>
            <title>Sign Up</title>
        </Head>
        <SignUp />
    </div>
);

export default SignUpPage;
