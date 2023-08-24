import { RiSearch2Line } from "react-icons/ri";
const studentHome = () => {
  return (
    <div className=" px-4  w-fit">
      <div className="py-8 border-b-[0.8px] border-slate-400">
        <div className="flex space-x-3 items-center border-b-[0.8px] ">
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

export default studentHome;
