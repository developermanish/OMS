import React, { useEffect } from "react";
import Link from "next/link";

import { checkToken } from "../../services/auth";
import Router from "next/router";

import { IoMdExit } from "react-icons/io";

const Header = () => {
    useEffect(() => {
        async function fetchToken() {
            console.log("check")

            const localToken = localStorage.getItem('token');
            const result = await checkToken(localToken);
            if (result.message !== "Success") {
                Router.push('/signin');
                alert(result.message);
            }
        }
        fetchToken();
    }, [])

    const handleLogout = () => {
        localStorage.setItem('token', null);
    }
    return (
        <div className="navbar navbar-styling">
            <ul className="justify-between">
                <div>
                    <ul className="p-4">
                        <li className="" style={{ border: "2px solid", borderRadius: "50%" }}>Alpha</li>
                    </ul>
                </div>
                <div >
                    <ul className="p-4">
                        <li><Link href="/"><span className="cursor-pointer font-bold hover:text-green-500 ">Home</span></Link></li>
                        <li><Link href="/state"><span className="cursor-pointer font-bold hover:text-green-500">State</span></Link></li>
                        <li><Link href="/district"><span className="cursor-pointer font-bold hover:text-green-500">District</span></Link></li>
                        <li><Link href="/child"><span className="cursor-pointer font-bold hover:text-green-500">Child</span></Link></li>
                        <li className="ml-20"><Link href="/signin"><span className="cursor-pointer font-bold hover:text-green-500" onClick={() => handleLogout()}><IoMdExit /><span className="ml-1">Logout</span></span></Link></li>
                    </ul>
                </div>
            </ul>
        </div>
    )
}
export default Header;