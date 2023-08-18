"use client";

import Link from "next/link";

import { useState, useEffect } from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [nameError, setNameError] = useState(false);
  const [usernameError, setUserNameError] = useState(false);
  const [studentNumberError, setStudentNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleDisabled = () => {
    const details = {
      name,
      studentNumber: studentNumber.toUpperCase(),
      email,
      mobile,
      username,
      password,
      confirmPassword,
    };

    if (
      details.name === "" ||
      details.studentNumber === "" ||
      details.email === "" ||
      details.mobile === "" ||
      details.username === "" ||
      details.password === "" ||
      details.confirmPassword === ""
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (password != 1234) {
      setPasswordError(true);
      setDisabled(true);
      return;
    } else if (password !== confirmPassword) {
      console.log("password is not equal");
      setPasswordError(false);
      setConfirmPasswordError(true);
      setConfirmPassword("");
      setDisabled(true);
      return;
    } else {
      setPasswordError(false);
      setConfirmPasswordError(false);
      console.log("passwords match");
    }
  };

  useEffect(() => {
    const runDisabled = () => {
      handleDisabled();
    };
    runDisabled();
  }, [name, studentNumber, username, email, password, mobile, confirmPassword]);

  return (
    <div>
      <div className="flex items-center">
        <div></div>
        <div className="h-screen px-4  w-full">
          <div className="pt-10">
            <h5 className="text-[19px] font-medium">Let's Get Started</h5>
            <p className="text-[11px] font-light text-gray-400">
              Fill the form to continue
            </p>
          </div>
          <div className="h-screen flex flex-col justify-center -mt-16  w-full">
            <form className=" flex flex-col" onSubmit={handleFormSubmit}>
              <div className="flex flex-col space-y-1 mb-6 w-full">
                <label htmlFor="name" className="font-medium text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full text-sm outline-none border border-green-300/75 px-4 py-3 rounded-xl placeholder:text-[9px]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col space-y-1 mb-6 w-full">
                <label htmlFor="studentNumber" className="font-medium text-sm">
                  Student Number
                </label>
                <input
                  type="text"
                  className="w-full text-sm outline-none border border-green-300/75 px-4 py-3 rounded-xl placeholder:text-[9px]"
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                  placeholder="KFS-222-444-555-666"
                />
              </div>
              <div className="flex flex-col space-y-1 mb-6 w-full">
                <label htmlFor="username" className="font-medium text-sm">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full text-sm outline-none border border-green-300/75 px-4 py-3 rounded-xl placeholder:text-[9px]"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="johnny"
                />
              </div>
              <div className="flex items-center w-full mb-6 space-x-1">
                <div className="flex flex-col space-y-1  w-full">
                  <label htmlFor="email" className="font-medium text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full text-sm outline-none border border-green-300/75 px-4 py-3 rounded-xl placeholder:text-[9px]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="johndoe@gmail.com"
                  />
                </div>
                <div className="flex flex-col space-y-1  w-full">
                  <label htmlFor="mobile" className="font-medium text-sm">
                    Mobile No.
                  </label>
                  <input
                    type="number"
                    className="w-full text-sm outline-none border border-green-300/75 px-4 py-3 rounded-xl placeholder:text-[9px]"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+2547......"
                  />
                </div>
              </div>
              <div className="flex items-center w-full space-x-1 mb-9">
                <div className="flex flex-col space-y-1  w-full">
                  <label htmlFor="password" className="font-medium text-sm">
                    Password
                  </label>
                  <div className="flex flex-col space-y-1 relative">
                    <input
                      type="password"
                      className={`w-full text-sm outline-none  px-4 py-3 rounded-xl placeholder:text-[9px] ${
                        passwordError
                          ? "border border-red-500 placeholder:text-red-500"
                          : "border border-green-300/75"
                      }`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                    />
                    {passwordError && (
                      <>
                        <p className="text-[10px] text-red-500 absolute -bottom-8">
                          Password must be more than 8 characters
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-1  w-full">
                  <label
                    htmlFor="confirmPassword"
                    className="font-medium text-sm"
                  >
                    Confirm Password
                  </label>
                  <div className="flex flex-col space-y-1 relative">
                    <input
                      type="password"
                      className={`w-full text-sm outline-none  px-4 py-3 rounded-xl placeholder:text-[9px] ${
                        confirmPasswordError
                          ? "border border-red-500 placeholder:text-red-500"
                          : "border border-green-300/75"
                      }`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="********"
                    />
                    {confirmPasswordError && (
                      <>
                        <p className="text-[10px] text-red-500 absolute -bottom-4">
                          Passwords do not match
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full ">
                <button
                  type="submit"
                  className={`outline-none text-sm  py-4 rounded-xl w-full transition-colors duration-200 ease-linear ${
                    disabled
                      ? "bg-slate-400/50 text-slate-50 cursor-not-allowed "
                      : "bg-black text-white"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="w-full text-center mt-12">
              <p className="text-[11px] text-slate-500">
                Already have an account?
                <span>
                  <Link
                    href="/login"
                    className="text-black font-bold text-[13px]"
                  >
                    {" "}
                    Sign In
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
