"use client";
import React, { useState } from "react";
import Image from "next/image";

interface LoginProps {}

const LoginPage: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();

  //     console.log("Email:", email);
  //     console.log("Password:", password);

  //     setEmail("");
  //     setPassword("");
  //     alert("Submitted")
  //   };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if (email === "valid@email.com" && password === "correctPassword") {
    //   setIsLoggedIn(true);
    // } else {
    //     console.log("Invalid credentials");
    //     alert("Login failed! Please check your email and password.");
    // }
    setIsLoggedIn(true);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isLoggedIn ? (
        // Render the component to display after successful login (replace with your component)
        <div>Welcome! You are now logged in.</div>
      ) : (
        <div className="bg-white shadow-md rounded px-8 py-6 w-1/3 md:w-1/2 lg:w-1/3">
          <h1 className="head-text text-primary font-bold text-center mb-0">
            Log<span className="text-primary mb-4">in</span>
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
          <form onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                type="submit"
                className="bg-white-500 hover:text-red-700 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
              <a
                href="#"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
