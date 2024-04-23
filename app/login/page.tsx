"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Corrected import
import axios from "axios";
import { toast } from "react-hot-toast";

interface LoginProps {}

const LoginPage: React.FC<LoginProps> = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 py-6 w-1/3 md:w-1/2 lg:w-1/3">
        <h1 className="head-text text-primary font-bold text-center mb-0">
          Log<span className="text-primary mb-4">in</span>
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
        <form onSubmit={onLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
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
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
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
            {/* <a
              href="#"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-700"
              >
              Forgot Password?
            </a> */}
            <div>
              <span className="bg-white-500 text-gray-700 font-bold  rounded  focus:shadow-outline">New User,</span>
              <Link href="/signup" passHref>
                <span className="bg-white-500 hover:text-red-700 text-gray-700 font-bold py-2 px-1 rounded focus:outline-none focus:shadow-outline">
                  Register
                </span>
              </Link>
            </div>
            <button
              type="submit"
              className="bg-white-500 hover:text-red-700 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={buttonDisabled}
            >
              {loading ? "Processing" : "Submit"}
            </button>
          </div>
          {/* <div className="btn flex justify-end mt-4">
            <Link href="/signup" passHref>
              Sign Up
            </Link>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
