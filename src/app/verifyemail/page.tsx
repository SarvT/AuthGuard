"use client";

import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";


export default function VerifyEmailPage(){
    const [emailVerified, setEmailVerified] = useState(false);
    const [token, setToken] = useState("");
    const [error, setError] = useState(false);

    const verifyUserEmail = async () =>{
        try {
            await axios.post('/api/users/verifemail',{token})
            setEmailVerified(true);
            
        } catch (error:any) {
            console.log("Error:", error?.response || error);

        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    },[])

    useEffect(()=>{
        if(token.length>0){
            verifyUserEmail();
        }
    }, [token])

    return (
        <div className="items-center flex flex-col justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>

            <h2 className="p-2 bg-slate-400 text-black">{token ? `${token}`:"no token"}</h2>

{emailVerified&&(
    <div>
        <h2 className="text-2xl">Email Verified</h2>
        <Link href={"/login"}>
            Login
        </Link>
    </div>
)

}

{error&&(
    <div>
        <h2 className="text-2xl">Error</h2>

    </div>
)

}


        </div>
    )

}
