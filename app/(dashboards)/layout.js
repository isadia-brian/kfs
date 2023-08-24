import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";

export default function DashBoardLayout({ children }) {
  return (
    <section className="flex">
      <div>
        <SideNav />
      </div>

      <div className=" flex-1">
        <TopNav />
        <div className="p-4">{children}</div>
      </div>
    </section>
  );
}
