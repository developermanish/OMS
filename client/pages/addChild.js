import React from "react";
import Head from "next/head";
import ChildForm from "../components/child/childForm";
import Header from "../components/common/Header"
import Router from "next/router";
import { IoIosArrowRoundBack } from "react-icons/io";

const childFormPage = () => (
    <div>
        <Head>
            <title>Add Child</title>
        </Head>
        <Header />
        <div className="mt-10">

            <div className="h-screen flex items-center justify-center">
                <div className="border border-gray-300 border-solid p-6 rounded-sm w-104">
                    <span className="cursor-pointer" onClick={() => { Router.push("/child") }}><IoIosArrowRoundBack size={30} /></span>
                    <div className="text-center">
                        {/* <img height="150" src="./svg/signup.svg" alt="sigup" /> */}
                        <h2 className="mt-2 mb-10 text-3xl text-gray-700">
                            Add Child
                    </h2>
                    </div>
                    <ChildForm />
                </div>
            </div>
        </div>
    </div>
)
export default childFormPage;