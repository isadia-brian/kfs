"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BiErrorCircle } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";
import { notification, Spin } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [trueValue, setTrueValue] = useState(false);
  const [errorStudentID, setErrorStudentID] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [iconError, setIconError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const errorNotification = (type, message) => {
    const notificationStyle = {
      backgroundColor: "red",
    };
    api[type]({
      message: <span className="text-white">Error</span>,
      description: (
        <span className="text-white font-bold text-[16px]">{message}</span>
      ),
      icon: <BiErrorCircle style={{ color: "#ffffff" }} />,
      className: "custom-class",
      style: notificationStyle,
    });
  };
  const successNotification = (type, message) => {
    const notificationStyle = {
      backgroundColor: "green",
    };
    api[type]({
      message: <span className="text-white">Success</span>,
      description: (
        <span className="text-white font-bold text-[16px]">{message}</span>
      ),

      className: "custom-class",
      style: notificationStyle,
    });
  };

  const {
    handleSubmit,
    register,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const watchStudent = watch("studentNumber", "");
  console.log(watchStudent);

  const onSubmit = async (data) => {
    let message;
    setLoading(true);
    setDisabled(true);
    const userDetails = {
      fullName: data["name"],
      studentNumber: data["studentNumber"],
      email: data["email"],
      mobile: data["mobile"],
      username: data["username"],
      password: data["password"],
    };

    setErrorEmail(false);
    setErrorStudentID(false);
    setErrorUsername(false);

    try {
      const response = await axios.post("/api/users", userDetails);
      const success = response?.data?.message;
      setLoading(false);
      setSuccess(true);
      successNotification("success", success);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.log(error);
      const errorResponseString = error?.response?.request?.responseText;
      const errorResponse = JSON.parse(errorResponseString);
      message = errorResponse.message;
      if (message === "This student ID has been taken") {
        setErrorStudentID(true);

        setLoading(false);

        setIconError(true);
        errorNotification("error", message);
        setTimeout(() => {
          setIconError(false);
          setDisabled(false);
        }, 3000);
      } else if (message === "This email has already been taken") {
        setErrorEmail(true);
        setIconError(true);
        setLoading(false);
        errorNotification("error", message);
        setTimeout(() => {
          setIconError(false);
          setDisabled(false);
        }, 3000);
      } else if (message === "This username has already been taken") {
        setErrorUsername(true);
        setIconError(true);
        setLoading(false);
        errorNotification("error", message);
        setTimeout(() => {
          setIconError(false);
          setDisabled(false);
        }, 3000);
      } else {
        message = "Something went wrong";
        setLoading(false);
        errorNotification("error", message);
        setTimeout(() => {
          setIconError(false);
          setDisabled(false);
        }, 1500);
      }
    }
  };

  const studentPattern = /^kfs-2023-\d{3}-\d{3}-\d{3}$/;

  const doesMatch = studentPattern.test(watchStudent);

  useEffect(() => {
    function getNameValue() {
      if (doesMatch) {
        setTrueValue(true);

        console.log(trueValue);
      } else {
        setTrueValue(false);

        console.log(trueValue);
      }
    }

    getNameValue();
  }, [trueValue, doesMatch]);

  return (
    <div>
      {contextHolder}
      <div className="flex items-center md:flex-row-reverse">
        <div className="hidden md:flex relative md:h-screen w-[50%]">
          <div className="relative h-full w-full">
            <Image
              src="/images/image.webp"
              alt="student image"
              fill
              className="object-cover"
              priority="true"
            />
          </div>
          <div className="w-full mb-20 md:mb-12 absolute top-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="relative h-28 w-28 px-2">
              <Image
                src="/images/signlogo.png"
                fill
                alt="logo"
                className="object-cover "
              />
            </div>
            <div className="">
              <h3 className="font-black text-white text-3xl underline ">
                KENYA FILM
              </h3>
              <h5 className="font-black text-white text-3xl -mt-2">SCHOOL</h5>
            </div>
          </div>
        </div>
        <div className="h-full px-4 md:px-12 lg:px-20 w-full  md:w-[50%]">
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
                  className={`w-full text-sm outline-none border px-4 py-3 rounded-xl placeholder:text-[9px] ${
                    errors.name ? "border-red-500" : "border-slate-300"
                  }`}
                  placeholder="John Doe"
                  {...register("name", {
                    required: "true",
                    minLength: 3,
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

              <div className="flex space-x-2 w-full">
                <div className="flex flex-col space-y-1 mb-6 w-full">
                  <label
                    htmlFor="studentNumber"
                    className="font-medium text-sm"
                  >
                    Student ID
                  </label>
                  <input
                    type="text"
                    className={`w-full text-sm outline-none border  px-4 py-3 rounded-xl placeholder:text-[9px] ${
                      errors.studentNumber || errorStudentID
                        ? "border-red-500"
                        : `${
                            trueValue ? "border-green-500" : "border-slate-300"
                          }`
                    }`}
                    placeholder="kfs-2023-************"
                    {...register("studentNumber", {
                      required: "true",
                      pattern: /^kfs-2023-\d{3}-\d{3}-\d{3}$/,
                    })}
                  />
                  {errors.studentNumber?.type === "required" ? (
                    <>
                      <span className="text-xs text-red-500">
                        ID is required
                      </span>
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
                <div className="flex flex-col space-y-1 mb-6 w-full">
                  <label htmlFor="username" className="font-medium text-sm">
                    Username
                  </label>
                  <input
                    type="text"
                    className={`w-full text-sm outline-none border px-4 py-3 rounded-xl placeholder:text-[9px] ${
                      errors.username || errorUsername
                        ? "border-red-500"
                        : "border-slate-300"
                    }`}
                    placeholder="johnnyDoe"
                    {...register("username", {
                      required: "true",
                      maxLength: 50,
                      minLength: 4,
                    })}
                  />
                  {errors.username?.type === "required" ? (
                    <>
                      <span className="text-xs text-red-500">
                        Username is required
                      </span>
                    </>
                  ) : errors.username?.type === "maxLength" ? (
                    <>
                      <span className="text-xs text-red-500">
                        Username should be less than 50 characters
                      </span>
                    </>
                  ) : errors.username?.type === "minLength" ? (
                    <>
                      <span className="text-xs text-red-500">
                        Username can be 4 or more characters
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-1 mb-6  w-full">
                <label htmlFor="email" className="font-medium text-sm">
                  Email
                </label>
                <input
                  type="email"
                  className={`w-full text-sm outline-none border  px-4 py-3 rounded-xl placeholder:text-[9px] ${
                    errors.email || errorEmail
                      ? "border-red-500"
                      : "border-slate-300"
                  }`}
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
                  className={`w-full text-sm outline-none border px-4 py-3 rounded-xl placeholder:text-[9px] ${
                    errors.mobile ? "border-red-500" : "border-slate-300"
                  }`}
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

              <div className="md:flex md:space-x-2 ">
                <div className="flex flex-col space-y-1 mb-6  w-full">
                  <label htmlFor="password" className="font-medium text-sm">
                    Password
                  </label>
                  <div className="flex flex-col space-y-1">
                    <input
                      type="password"
                      className={`w-full text-sm outline-none border  px-4 py-3 rounded-xl placeholder:text-[9px] ${
                        errors.password ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="********"
                      {...register("password", {
                        required: "true",
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
                      className={`w-full text-sm outline-none border  px-4 py-3 rounded-xl placeholder:text-[9px] ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-slate-300"
                      } `}
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

              <div className="w-full ">
                <button
                  type="submit"
                  className={`outline-none text-sm mb-6 flex justify-center py-3  text-white rounded-xl w-full transition-colors duration-200 ease-linear ${
                    disabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black cursor-pointer"
                  } `}
                >
                  {loading ? (
                    <p className="text-red-500">
                      {" "}
                      <Spin />
                    </p>
                  ) : iconError ? (
                    <BiErrorCircle className="text-2xl text-red-500" />
                  ) : success ? (
                    <BsCheckCircleFill className="text-xl " />
                  ) : (
                    <span>Sign Up</span>
                  )}
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

export default Signup;
