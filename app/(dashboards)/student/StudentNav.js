import Link from "next/link";
import {
  HiOutlineHome,
  HiOutlineChartPie,
  HiOutlineCalendar,
  HiOutlineAcademicCap,
} from "react-icons/hi2";

const Links = [
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

const StudentNav = () => {
  return (
    <div>
      <ul className="flex flex-col space-y-6">
        {Links.map((item, index) => {
          return (
            <li key={index}>
              <Link
                href={item.link}
                className="flex items-center space-x-3 text-slate-600"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StudentNav;
