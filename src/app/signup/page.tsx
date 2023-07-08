"use client";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { log } from "console";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const onSignup = async () => {
    // try {
    //   await axios
    //   .post("/api/auth/signup", {...user })
    //   .then(({ data }) => alert(`Success ${data}`))
    //   .catch((error) =>
    //   error?.response

    try {
      setLoading(true);
      const  response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      router.push("/login");
      
    } catch (error: any) {
      console.log("Error while creating account: "+ error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }

    // if((!!user['username'] && user["username"].length >3 )&& (!!
    //   user['password'])&&( !!user['email'])){
    //     console.log("enable button")
    //     setButtonDisabled(false)}else{
    //       console.log('disable')
    //       setButtonDisabled(true)}}
    //       ,[setUser]);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-indigo-600">
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <br />
      Username:
      <input
        className="text-black border-green-500 focus:outline-none focus:border-green-200 rounded-lg mb-4 p-2 border"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="AlexJohn"
      ></input>
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
        onClick={onSignup}
      >
        {buttonDisabled ? "Can't" : "Submit"}
      </button>
      <Link href={"/login"}>Already signed up? Login Instead.</Link>
    </div>
  );
}
