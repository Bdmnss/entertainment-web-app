"use client";

import Image from "next/image";
import searchImage from "../public/assets/icon-search.svg";
import { useState } from "react";
import data from "../data.json";

export default function HomeSearch() {
  const [searchInput, setSearchInput] = useState("");

  const hasSearchedItems = data.some((item) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex items-center gap-4 bg-[#10141e] py-[1rem] relative">
      <label htmlFor="search">
        <Image src={searchImage} alt="search icon" width={24} />
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search for movies or TV series"
        className="bg-[#10141e] text-white w-[80%] border-none focus:outline-none text-[1.6rem] font-light"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {searchInput && hasSearchedItems ? (
        <div
          className="absolute bg-[#10141e] w-[100%] h-[30rem] rounded-lg shadow-lg z-10 top-[6rem] overflow-hidden
      overflow-y-scroll border border-[#3d3d3d] scroll-smooth"
        >
          {data
            .filter((item) =>
              item.title.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((item) => (
              <div
                key={item.title}
                className="p-4 border-b border-[#3d3d3d] flex items-center gap-4"
              >
                <Image
                  src={item.thumbnail.regular.small}
                  alt={item.title}
                  width={100}
                  height={100}
                />
                <p className="text-white text-[1.5rem]">{item.title}</p>
              </div>
            ))}
        </div>
      ) : searchInput ? (
        <div
          className="absolute bg-[#10141e] w-[100%] h-[10rem] rounded-lg shadow-lg z-10 top-[6rem] 
        overflow-hidden border border-[#3d3d3d] flex items-center justify-center"
        >
          <p className="text-white text-[1.6rem] font-light">
            No results found
          </p>
        </div>
      ) : null}
    </div>
  );
}
