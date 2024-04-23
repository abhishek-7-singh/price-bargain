"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";  // Updated import and marked as client
import axios from "axios";
import { toast } from "react-hot-toast";

interface SignupProps {}

const SignupPage: React.FC<SignupProps> = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Signup success");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0 && user.username.length > 0));
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 py-6 w-1/3 md:w-1/2 lg:w-1/3">
        <h1 className="head-text text-primary font-bold text-center mb-0">
          Sign<span className="text-primary mb-4">up</span>
        </h1>
        <div className="items-center">
          <Image
            src="/assets/icons/hand-drawn-arrow.svg"
            alt="arrow"
            width={150}
            height={175}
            className="max-xl:hidden mb-4 left-1/2 items-center bottom-0 z-0"
          />
        </div>
        <form onSubmit={onSignup}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <Link href="/login" className="bg-white-500 hover:text-red-700 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" passHref>
            Login
            </Link>
            <button
              type="submit"
              className="bg-white-500 hover:text-red-700 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={buttonDisabled}
            >
              {loading ? "Processing" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage
