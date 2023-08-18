"use client";

import { Switch } from "antd";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div>
      <div className="flex items-center">
        <div></div>
        <div className="h-screen px-4  w-full">
          <div className="h-screen flex flex-col justify-center  w-full">
            <div className="w-full mb-8 flex justify-center">
              <div className="relative h-20 w-20 rounded-full border border-red-300/100">
                {/* <Image
                  src="/logo2.png"
                  fill
                  alt="logo"
                  className="object-contain"
                /> */}
              </div>
            </div>
            <form className=" flex flex-col">
              <div className="flex flex-col space-y-2 mb-5 w-full">
                <label htmlFor="user" className="font-medium text-sm">
                  Student's Number / Username
                </label>
                <input
                  type="text"
                  required
                  className="w-full outline-none border border-slate-300 px-4 py-3 rounded-xl placeholder:text-[9px]"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="KFS-222-444-555-666"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-2 w-full">
                <label htmlFor="password" className="font-medium text-sm">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full outline-none border border-slate-300 px-4 py-3 rounded-xl placeholder:text-[9px]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                />
              </div>

              <div className="w-full flex flex-row-reverse mb-5">
                <Link href="#" className="text-[12px] text-slate-500 flex">
                  Forgot Password?
                </Link>
              </div>

              <div className="w-full flex items-center justify-between mb-9">
                <p className="font-bold text-[12px]">Remember me next time</p>
                <Switch
                  defaultChecked
                  onChange={onChange}
                  className=" bg-slate-200"
                />
              </div>
              <div className="w-full ">
                <button
                  type="submit"
                  className="outline-none bg-black text-white text-sm  py-4 rounded-xl w-full"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="w-full text-center mt-20">
              <p className="text-[11px] text-slate-500">
                Don't have an account?
                <span>
                  <Link
                    href="/signup"
                    className="text-black font-bold text-[13px]"
                  >
                    {" "}
                    Sign Up
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
