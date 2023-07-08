"use client";
import Link from "next/link";
import React, { useEffect } from "react";

import toast from "react-hot-toast"
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);


  const onLogin = async () => {
    try{
      setLoading(true);
      const reponse = await axios.post("/api/users/login", user);
      console.log("Login successful!"+reponse.data);
      toast.success("Login successful!");
      router.push("/profile");
    } catch(error:any){
      console.log("Error", error?.response || error );

    } finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0) setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-indigo-600">
      <h1>{!loading? "This is the login page.": "Processing"}</h1>
      <br />
      Email:
      <input
        className="text-black border-green-500 focus:outline-none focus:border-green-200 rounded-lg mb-4 p-2 border"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      ></input>
      password:
      <input
        className="text-black border-green-500 focus:outline-none focus:border-green-200 rounded-lg mb-4 p-2 border"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      ></input>
      <button
        className="border-indigo-950 bg-blue-950 focus:outline-none focus:border-green-200 rounded-lg mb-4 p-2 border px-6"
        onClick={onLogin}
      >
        {buttonDisabled ? "Can't" : "Submit"}
      </button>
      <Link href={"/signup"}>First time here? SignUp Instead.</Link>
    </div>
  );
}
