import React from "react";
import Router from "next/router";
import Link from "next/link";

import SignInForm from "./components/SignInForm";

const SignIn = () => {
    const onSigninSuccess = () => {
        Router.push("/");
    };
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="border border-gray-300 border-solid p-6 rounded-sm w-104">
                <div className="text-center">
                    <img height="150" src="./svg/signin.svg" alt="sigin" />
                    <h2 className="mt-2 mb-10 text-3xl text-gray-700">
                        SignIn
                    </h2>
                </div>
                <SignInForm onSuccess={onSigninSuccess} />
                <div className="text-center text-sm mt-10">
                    <span className="text-gray-600 mr-1">Don't have an account?</span>
                    <span><Link href="/signup"><a className="no-underline text-indigo-600 font-medium">Create</a></Link></span>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
