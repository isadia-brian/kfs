"use client";

import { useForm } from "react-hook-form";

import { Switch } from "antd";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

const Login = () => {
  // const [user, setUser] = useState("");
  // const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log("data posted");
  };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div>
      <div className="flex items-center">
        <div className="hidden md:flex h-screen w-[55%]">
          <div className="relative h-full w-full">
            <Image
              src="/images/image.jpg"
              alt="student image"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="h-screen px-4  w-full md:w-[45%] md:px-20">
          <div className="h-screen flex flex-col justify-center  w-full">
            <div className="w-full flex justify-center">
              <h4 className="font-black text-4xl uppercase">Sign In</h4>
            </div>
            <div className="w-full my-8 flex justify-center">
              <div className="relative h-20 w-20 rounded-full border border-red-300/100">
                {/* <Image
                  src="/logo2.png"
                  fill
                  alt="logo"
                  className="object-contain"
                /> */}
              </div>
            </div>
            <form className=" flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-2 mb-5 w-full">
                <label htmlFor="studentNumber" className="font-medium text-sm ">
                  Student ID
                </label>
                <input
                  name="studentNumber"
                  autoComplete="studentNumber"
                  type="text"
                  className={`w-full outline-none border px-4 py-3 rounded-xl placeholder:text-[9px] ${
                    errors.studentNumber
                      ? "border-red-500"
                      : "border-slate-300 "
                  }`}
                  placeholder="KFS-222-444-555-666"
                  {...register("studentNumber", {
                    required: "true",
                    pattern: /^kfs-2023-\d{3}-\d{3}-\d{3}$/,
                  })}
                />
                {errors.studentNumber?.type === "required" ? (
                  <span className="text-xs text-red-500">
                    This field is required
                  </span>
                ) : errors.studentNumber?.type === "pattern" ? (
                  <span className="text-xs text-red-500">
                    This is not a student number
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex flex-col space-y-2 mb-2 w-full">
                <label htmlFor="password" className="font-medium text-sm">
                  Password
                </label>
                <input
                  name="password"
                  autoComplete="password"
                  type="password"
                  className={`w-full outline-none border  px-4 py-3 rounded-xl placeholder:text-[9px] ${
                    errors.password ? "border-red-500" : "border-slate-300"
                  }`}
                  placeholder="********"
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*[A-Z])(?=.*\d).{8,20}$/,
                  })}
                />
                {errors.password?.type === "required" ? (
                  <span className="text-xs text-red-500">
                    This field is required
                  </span>
                ) : errors.password?.type === "pattern" ? (
                  <>
                    <span className="text-xs text-red-500">
                      Password must contain an uppercase letter, a number, and
                      should be between 8-20 characters
                    </span>
                  </>
                ) : (
                  <></>
                )}
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
