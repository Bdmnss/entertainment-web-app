import Image from "next/image";
import searchImage from "../public/assets/icon-search.svg";

export default function Search() {
  return (
    <div className="flex items-center gap-4 bg-[#10141e] py-[2.4rem] px-[1.6rem]">
      <label htmlFor="search">
        <Image src={searchImage} alt="search icon" width={24} />
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search for movies or TV series"
        className="bg-[#10141e] text-white w-[80%] border-none focus:outline-none text-[1.6rem] font-light"
      />
    </div>
  );
}
