import React from "react";
import Link from "next/link";
import Router from "next/router";

import SignUpForm from "./components/SignUpForm";

const SignUp = () => {
    const onSignupSucess = () => {
        Router.push("/signin");
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="border border-gray-300 border-solid p-6 rounded-sm w-104">
                <div className="text-center">
                    <img height="150" src="./svg/signup.svg" alt="sigup" />
                    <h2 className="mt-2 mb-10 text-3xl text-gray-700">
                        SignUp
                    </h2>
                </div>
                <SignUpForm onSucess={onSignupSucess} />
                <div className="text-center text-sm mt-10">
                    <span className="text-gray-600 mr-1">Already have an account?</span>
                    <span><Link href="/signin"><a className="no-underline text-indigo-600 font-medium">Sign In</a></Link></span>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
