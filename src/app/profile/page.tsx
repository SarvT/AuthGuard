"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState('n');
  const Logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("You have been logged out successfully!");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  const getUserDetails = async () =>{
    const response = await axios.get('/api/users/subject');
    // console.log(response.data);
    setUserData(response.data.data._id);
  }

  return (
    <div className="min-h-screen bg-indigo-700 text-center items-center justify-center text-2xl p-4 font-mono uppercase">
      This is the profile page.
      <br />
      <h3>{userData==='n' ? "naah" : 
      <Link href={`/profile/${userData}`}/>}{userData}</h3>
      <button
        onClick={Logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-orange-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Subject
      </button>
    </div>
  );
}
