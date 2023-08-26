"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const ClientRoot = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [shown, setShown] = useState(false);
  const clickHandler = () => {
    setShown(!shown);
  };

  const handleClick = () => {
    signOut();
  };

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="grid grid-cols-2 text-black p-4">
      <div>
        <h1 className="leading-loose text-[15rem] font-extrabold text-accent">
          Hi {session?.user.fullName}!
        </h1>
      </div>
      <div>
        <p>Protected client page</p>
        <button
          className="bg-green-500 px-2 py-3 w-[300px]"
          onClick={clickHandler}
        >
          Toggle
        </button>
        {shown ? <pre>{JSON.stringify(session, null, 2)}</pre> : null}
        <button
          className="bg-red-500 px-2 py-3 w-[300px] inline-block"
          onClick={handleClick}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ClientRoot;
