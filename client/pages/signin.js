import React from "react";
import Head from "next/head";

import SignIn from "../components/auth/SignIn";

const SignInPage = () => (
    <div>
        <Head>
            <title>Sign In</title>
        </Head>
        <SignIn />
    </div>
);

export default SignInPage;
