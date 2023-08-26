import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Client(req) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex h-screen w-full items-center justify-center text-black p-4">
      <div>
        {session !== null ? (
          <h1 className="leading-loose text-[15rem] font-extrabold text-accent">
            Hi {session?.user.name}!
          </h1>
        ) : (
          <div className="flex space-x-5 items-center">
            <Link
              className="bg-black px-10 py-2 text-white rounded-lg"
              href="/api/auth/signin"
            >
              Sign in
            </Link>
            <Link
              className="bg-black px-10 py-2 text-white rounded-lg"
              href="/api/auth/signout"
            >
              Sign Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
