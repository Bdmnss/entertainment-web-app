"use client";

import data from "@/data.json";
import Image from "next/image";
import { useBookmarkStore } from "@/stores/bookmarkStore";
import bookmarkFullIcon from "../public/assets/icon-bookmark-full.svg";
import bookmarkEmptyIcon from "../public/assets/icon-bookmark-empty.svg";
import movieCategoryIcon from "../public/assets/icon-category-movie.svg";
import tvCategoryIcon from "../public/assets/icon-category-tv.svg";
import { usePageStore } from "@/stores/pageStore";
import { useRouter } from "next/navigation";

export default function MainContent() {
  const bookmarkStore = useBookmarkStore();
  const pageStore = usePageStore();
  const router = useRouter();

  return (
    <div>
      <h2 className="text-white text-[2rem] font-light mb-[2.4rem]">
        Recommended for you
      </h2>
      <div className="flex flex-wrap gap-[1.3rem] justify-center">
        {data.map((item) =>
          (pageStore.currentPage === "home" && !item.isTrending) ||
          (pageStore.currentPage === "movies" && item.category === "Movie") ||
          (pageStore.currentPage === "series" &&
            item.category === "TV Series") ? (
            <div
              key={item.id}
              onClick={(e) => {
                if (
                  (e.target as HTMLDivElement).closest("#bookmark")?.id !==
                  "bookmark"
                ) {
                  pageStore.setCurrentPage("");
                  router.push(`/${item.id}`);
                }
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${item.thumbnail.regular.small})`,
                }}
                className="relative bg-cover bg-center rounded-[0.8rem] w-[16.5rem] h-[11rem] mb-[1rem]"
              >
                <div
                  id="bookmark"
                  className="w-[3.2rem] h-[3.2rem] bg-[#10141e] rounded-full flex items-center 
                    justify-center opacity-70 absolute right-3 top-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    bookmarkStore.toggleBookmark(item.title);
                  }}
                >
                  {item.isBookmarked ? (
                    <Image src={bookmarkFullIcon} alt="bookmark full icon" />
                  ) : (
                    <Image src={bookmarkEmptyIcon} alt="bookmark empty icon" />
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
        )}
      </div>
    </div>
  );
}
