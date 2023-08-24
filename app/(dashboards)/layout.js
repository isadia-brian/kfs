import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";

import {
  HiOutlineHome,
  HiOutlineChartPie,
  HiOutlineCalendar,
  HiOutlineAcademicCap,
} from "react-icons/hi2";

const studentLinks = [
  {
    name: "Dashboard",
    link: "/dashboard/student/home",
    icon: <HiOutlineHome />,
  },
  {
    name: "Academics",
    link: "/dashboard/student/home",
    icon: <HiOutlineAcademicCap />,
  },
  {
    name: "Events",
    link: "/dashboard/student/home",
    icon: <HiOutlineCalendar />,
  },
  {
    name: "Reports",
    link: "/dashboard/student/home",
    icon: <HiOutlineChartPie />,
  },
];

export default function DashBoardLayout({ children }) {
  return (
    <section className="flex">
      <div>
        <SideNav studentLinks={studentLinks} />
      </div>

      <div className=" flex-1">
        <TopNav />
        <div className="p-4">{children}</div>
      </div>
    </section>
  );
}
