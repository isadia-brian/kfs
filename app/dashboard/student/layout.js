import Image from "next/image";
import StudentNav from "./StudentNav";
export default function DashBoardLayout({ children }) {
  return (
    <section className="flex">
      <aside className="w-fit space-y-20 text-black border-r-[0.6px] py-6 px-4 flex flex-col  h-screen">
        <div className="flex items-center space-x-2">
          <div className="relative h-[50px] w-[50px] rounded-full  shadow-xl">
            <Image
              src="/images/kfslogo.png"
              fill
              alt="logo"
              className="object-cover"
            />
          </div>
          <h5 className="text-center text-sm max-w-[100px] font-bold">
            THE KENYA FILM SCHOOL
          </h5>
        </div>

        <StudentNav />
      </aside>
      {children}
    </section>
  );
}
