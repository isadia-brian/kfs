import Link from "next/link";

export default function DashBoardLayout({ children }) {
  return (
    <section className="flex">
      <aside className="w-[15%] bg-black text-white h-screen">
        <ul>
          <li>
            <Link href="/dashboard/student/home">Home</Link>
          </li>
        </ul>
      </aside>
      {children}
    </section>
  );
}
