"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log("data posted");
  };
  return (
    <div>
      <div className="flex items-center md:flex-row-reverse">
        <div className="hidden md:flex h-screen w-[50%]">
          <div className="relative h-full w-full">
            <Image
              src="/images/image.jpg"
              alt="student image"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="h-full px-4 md:px-24 w-full  md:w-[50%]">
          <div className="pt-10">
            <h5 className="text-[19px] font-medium md:text-[32px] md:font-black">
              Let's Get Started
            </h5>
            <p className="text-[11px] font-light text-gray-400 md:text-sm">
              Fill the form to continue
            </p>
          </div>
          <div className="h-full flex flex-col  mt-9   w-full">
            <form
              className="h-full flex flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col space-y-1 mb-6 w-full">
                <label htmlFor="name" className="font-medium text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full text-sm outline-none border border-slate-300 px-4 py-3 rounded-xl placeholder:text-[9px]"
                  placeholder="John Doe"
                  {...register("name", {
                    required: "true",
                    minLength: 4,
                    maxLength: 50,
                  })}
                />
                {errors.name?.type === "required" ? (
                  <>
                    <span className="text-xs text-red-500">
                      Name is required
                    </span>
                  </>
                ) : errors.name?.type === "minLength" ? (
                  <>
                    <span className="text-xs text-red-500">
                      Minimum characters should be 4 characters
                    </span>
                  </>
                ) : errors.name?.type === "maxLength" ? (
                  <>
                    <span className="text-xs text-red-500">
                      Maximum characters should be 50 characters
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="flex flex-col space-y-1 mb-6 w-full">
                <label htmlFor="studentNumber" className="font-medium text-sm">
                  Student ID
                </label>
                <input
                  type="text"
                  className="w-full text-sm outline-none border border-slate-300 px-4 py-3 rounded-xl placeholder:text-[9px]"
                  placeholder="KFS-222-444-555-666"
                  {...register("studentNumber", {
                    required: "true",
                    pattern: /^kfs-2023-\d{3}-\d{3}-\d{3}$/,
                  })}
                />
                {errors.studentNumber?.type === "required" ? (
                  <>
                    <span className="text-xs text-red-500">ID is required</span>
                  </>
                ) : errors.studentNumber?.type === "pattern" ? (
                  <>
                    <span className="text-xs text-red-500">
                      This is not a valid student ID
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="flex flex-col space-y-1 mb-6  w-full">
                <label htmlFor="email" className="font-medium text-sm">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full text-sm outline-none border border-slate-300 px-4 py-3 rounded-xl placeholder:text-[9px]"
                  placeholder="johndoe@gmail.com"
                  {...register("email", {
                    required: "true",
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  })}
                />
                {errors.email?.type === "required" ? (
                  <>
                    <span className="text-xs text-red-500">
                      Email is required
                    </span>
                  </>
                ) : errors.email?.type === "pattern" ? (
                  <>
                    <span className="text-xs text-red-500">
                      Enter a correct email address
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="flex flex-col space-y-1 mb-6  w-full">
                <label htmlFor="mobile" className="font-medium text-sm">
                  Mobile No.
                </label>
                <input
                  type="text"
                  className="w-full text-sm outline-none border border-slate-300 px-4 py-3 rounded-xl placeholder:text-[9px]"
                  placeholder="+2547......"
                  {...register("mobile", {
                    required: "true",
                    pattern: /^(?:\+254|0)([1-9]\d{8})$/,
                  })}
                />
                {errors.mobile?.type === "required" ? (
                  <>
                    <span className="text-xs text-red-500">
                      Mobile Number is required
                    </span>
                  </>
                ) : errors.mobile?.type === "pattern" ? (
                  <>
                    <span className="text-xs text-red-500">
                      Enter a correct phone number
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="hidden md:flex md:space-x-2 ">
                <div className="flex flex-col space-y-1 mb-6  w-full">
                  <label htmlFor="password" className="font-medium text-sm">
                    Password
                  </label>
                  <div className="flex flex-col space-y-1">
                    <input
                      type="password"
                      className={`w-full text-sm outline-none border border-slate-300  px-4 py-3 rounded-xl placeholder:text-[9px]`}
                      placeholder="********"
                      {...register("password", {
                        required: true,
                        pattern: /^(?=.*[A-Z])(?=.*\d).{8,20}$/,
                      })}
                    />
                    {errors.password?.type === "required" ? (
                      <span className="text-xs text-red-500">
                        Password is required
                      </span>
                    ) : errors.password?.type === "pattern" ? (
                      <>
                        <span className="text-xs text-red-500 ">
                          Password should contain an uppercase letter, a number
                          and a should be between 8-12 characters
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-1 mb-6  w-full">
                  <label
                    htmlFor="confirmPassword"
                    className="font-medium text-sm"
                  >
                    Confirm Password
                  </label>
                  <div className="flex flex-col space-y-1">
                    <input
                      type="password"
                      className={`w-full text-sm outline-none border border-slate-300  px-4 py-3 rounded-xl placeholder:text-[9px]`}
                      placeholder="********"
                      {...register("confirmPassword", {
                        required: "true",

                        validate: (value) => value === getValues("password"),
                      })}
                    />
                    {errors.confirmPassword && (
                      <span className="text-xs text-red-500">
                        Passwords don't match
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="md:hidden flex flex-col space-y-1 mb-6  w-full">
                <label htmlFor="password" className="font-medium text-sm">
                  Password
                </label>
                <div className="flex flex-col space-y-1">
                  <input
                    type="password"
                    className={`w-full text-sm outline-none border border-slate-300  px-4 py-3 rounded-xl placeholder:text-[9px]`}
                    placeholder="********"
                    {...register("password", {
                      required: true,
                      pattern: /^(?=.*[A-Z])(?=.*\d).{8,20}$/,
                    })}
                  />
                  {errors.password?.type === "required" ? (
                    <span className="text-xs text-red-500">
                      Password is required
                    </span>
                  ) : errors.password?.type === "pattern" ? (
                    <>
                      <span className="text-xs text-red-500 ">
                        Password should contain an uppercase letter, a number
                        and a should be between 8-12 characters
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="md:hidden flex flex-col space-y-1 mb-6  w-full">
                <label
                  htmlFor="confirmPassword"
                  className="font-medium text-sm"
                >
                  Confirm Password
                </label>
                <div className="flex flex-col space-y-1">
                  <input
                    type="password"
                    className={`w-full text-sm outline-none border border-slate-300  px-4 py-3 rounded-xl placeholder:text-[9px]`}
                    placeholder="********"
                    {...register("confirmPassword", {
                      required: "true",

                      validate: (value) => value === getValues("password"),
                    })}
                  />
                  {errors.confirmPassword && (
                    <span className="text-xs text-red-500">
                      Passwords don't match
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full ">
                <button
                  type="submit"
                  className={`outline-none text-sm mb-6  py-4 bg-black text-white rounded-xl w-full transition-colors duration-200 ease-linear `}
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="w-full text-center mb-6">
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
