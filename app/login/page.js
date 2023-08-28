"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Switch } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = async ({ userAuth, password }) => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      userAuth,
      password,
    });

    if (result.error) {
      setError(result.error);
      setInputError(true);
      setLoading(false);
    } else {
      setLoading(false);
      setSuccess(true);
      router.push("/student");
    }
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
              priority="true"
            />
          </div>
        </div>
        <div className="h-screen px-4  w-full md:w-[45%] md:px-20">
          <div className="h-screen flex flex-col justify-center  w-full">
            <div className="w-full mb-20 md:mb-12 flex items-center justify-center">
              <div className="relative h-24 w-24">
                <Image
                  src="/images/logo.png"
                  fill
                  alt="logo"
                  className="object-cover"
                />
              </div>
              <div className="">
                <h3 className="font-black text-black text-2xl underline ">
                  KENYA FILM
                </h3>
                <h5 className="font-black text-green-600 text-2xl -mt-1 text-center">
                  SCHOOL
                </h5>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <h4 className="font-black text-xl mb-4 underline uppercase">
                Sign In
              </h4>
            </div>

            <form className=" flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              {error ? (
                <span className="text-sm text-red-500 mb-3">{error}</span>
              ) : (
                <></>
              )}
              <div className="flex flex-col space-y-2 mb-5 w-full">
                <label htmlFor="userAuth" className="font-medium text-sm ">
                  Student ID / Username
                </label>
                <input
                  name="userAuth"
                  autoComplete="userAuth"
                  type="text"
                  className={`w-full outline-none border px-4 py-3 rounded-xl placeholder:text-[9px] ${
                    errors.userAuth || inputError
                      ? "border-red-500"
                      : "border-slate-300"
                  }`}
                  placeholder="kfs-2023-*** or johnnyDoe"
                  {...register("userAuth", {
                    required: "true",
                  })}
                />
                {errors.userAuth?.type === "required" ? (
                  <span className="text-xs text-red-500">
                    This field is required
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
                    errors.password || inputError
                      ? "border-red-500"
                      : "border-slate-300"
                  }`}
                  placeholder="********"
                  {...register("password", {
                    required: "true",
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
            <div className="w-full text-center mt-16">
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
