import { RiSearch2Line } from "react-icons/ri";

const TopNav = () => {
  return (
    <div className=" px-4 w-full border-b-[0.8px]">
      <div className="py-8 flex justify-between w-full  border-slate-400">
        <div className="flex space-x-3 items-center border-b-[0.8px] pb-1 ">
          <input
            type="text"
            placeholder="Search for anything"
            className="placeholder:text-sm placeholder:font-light outline-none"
          />
          <p className="font-thin text-slate-400">
            <RiSearch2Line />
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
