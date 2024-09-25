"use client";
import { useBookmarkStore } from "@/stores/bookmarkStore";
import Image from "next/image";
import bookmarkFullIcon from "../../public/assets/icon-bookmark-full.svg";
import bookmarkEmptyIcon from "../../public/assets/icon-bookmark-empty.svg";
import movieCategoryIcon from "../../public/assets/icon-category-movie.svg";
import tvCategoryIcon from "../../public/assets/icon-category-tv.svg";

export default function Page() {
  const bookmarkStore = useBookmarkStore();

  const hasBookmarkedItems = bookmarkStore.data.some(
    (item) => item.isBookmarked
  );

  return (
    <div className="bg-[#10141e] min-h-screen min-w-screen px-[1.3rem] pt-7 pb-10">
      <h2 className="text-white text-[2rem] font-light mb-[2.4rem]">
        Bookmarked
      </h2>
      <div className=" flex flex-wrap gap-[1.3rem] ">
        {hasBookmarkedItems ? (
          bookmarkStore.data.map((item) =>
            item.isBookmarked ? (
              <div key={item.title}>
                <div
                  style={{
                    backgroundImage: `url(${item.thumbnail.regular.small})`,
                  }}
                  className="relative bg-cover bg-center rounded-[0.8rem] w-[16.5rem] h-[11rem] mb-[1rem]"
                >
                  <div
                    className="w-[3.2rem] h-[3.2rem] bg-[#10141e] rounded-full flex items-center 
                  justify-center opacity-70 absolute right-3 top-3"
                    onClick={() => bookmarkStore.toggleBookmark(item.title)}
                  >
                    {item.isBookmarked ? (
                      <Image src={bookmarkFullIcon} alt="bookmark full icon" />
                    ) : (
                      <Image
                        src={bookmarkEmptyIcon}
                        alt="bookmark empty icon"
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-white text-[1.1rem] font-light">
                    {item.year}
                  </p>
                  <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                  {item.category === "Movie" ? (
                    <Image src={movieCategoryIcon} alt="movie icon" />
                  ) : (
                    <Image src={tvCategoryIcon} alt="tv icon" />
                  )}
                  <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                  <p className="text-white text-[1.1rem] font-light">
                    {item.rating}
                  </p>
                </div>
                <h2 className="text-white text-[1.4rem] font-medium">
                  {item.title}
                </h2>
              </div>
            ) : null
          )
        ) : (
          <div className="flex justify-center items-center text-white text-[3rem]">
            No Bookmarked
          </div>
        )}
      </div>
    </div>
  );
}
