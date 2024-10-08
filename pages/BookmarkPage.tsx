"use client";

import { useBookmarkStore } from "@/stores/bookmarkStore";
import MoviesList from "@/components/MoviesList";

export default function BookmarkPage() {
  const bookmarkStore = useBookmarkStore();

  const hasBookmarkedItems = bookmarkStore.data.some(
    (item) => item.isBookmarked
  );

  return (
    <div className="bg-[#10141e] min-h-screen min-w-screen px-[1.3rem] pt-7 pb-10">
      <div className=" flex flex-wrap gap-[1.3rem] justify-center md:mt-[10rem] xl:mt-0">
        {hasBookmarkedItems ? (
          bookmarkStore.data.map((item) =>
            item.isBookmarked ? <MoviesList key={item.id} item={item} /> : null
          )
        ) : (
          <div className="flex justify-center items-center text-white text-[3rem] md:text-[5rem]">
            No Bookmarked
          </div>
        )}
      </div>
    </div>
  );
}
