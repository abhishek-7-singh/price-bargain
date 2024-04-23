"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
    setUsername(res.data.data.username);
    setEmail(res.data.data.email);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="my-5 bg-white shadow-md rounded px-8 py-6 w-1/3 md:w-1/2 lg:w-1/3">
        <h1 className="head-text text-primary font-bold text-center mb-0">
          My <span className="text-primary mb-4">Profile</span>
        </h1>
        <div className="items-center">
          <Image
            src="assets/icons/hand-drawn-arrow.svg"
            alt="arrow"
            width={150}
            height={175}
            className="max-xl:hidden mb-4 left-1/2 items-center bottom-0 z-0"
          />
        </div>
        <form>
          <div className="my-5">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              <span className=" text-3xl text-primary mb-4 font-bold">
                Username:{" "}
              </span>{"  "}
              <span className="text-3xl">{username}</span>
            </label>
          </div>
          <div className="my-5">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              <span className=" text-3xl text-primary mb-4 font-bold">
                Email:{" "}
              </span>{"  "}
              <span className="text-3xl">{email}</span>
            </label>
          </div>
        </form>
        <button type="button" className="btn my-5" onClick={logout}>
          LogOut
        </button>
      </div>
    </div>
  );
}