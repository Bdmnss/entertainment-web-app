"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import data from "../data.json";
import Image from "next/image";
import bookmarkFullIcon from "../public/assets/icon-bookmark-full.svg";
import bookmarkEmptyIcon from "../public/assets/icon-bookmark-empty.svg";
import movieCategoryIcon from "../public/assets/icon-category-movie.svg";
import tvCategoryIcon from "../public/assets/icon-category-tv.svg";
import { useBookmarkStore } from "@/stores/bookmarkStore";
import { usePageStore } from "@/stores/pageStore";

export default function Slider() {
  const bookmarkStore = useBookmarkStore();
  const pageStore = usePageStore();
  return (
    <div className={`${pageStore.currentPage !== "home" ? "hidden" : ""}`}>
      <h2 className="text-white text-[2rem] font-light mb-[1.6rem]">
        Trending
      </h2>

      <div>
        <Swiper slidesPerView={1.4} spaceBetween={16} className="h-[14rem]">
          {data.map(
            (item) =>
              item.isTrending && (
                <SwiperSlide key={item.title}>
                  <div
                    style={{
                      backgroundImage: `url(${item.thumbnail.trending?.small})`,
                    }}
                    className="relative bg-cover bg-center rounded-[0.8rem] h-full"
                  >
                    <div
                      className="w-[3.2rem] h-[3.2rem] bg-[#10141e] rounded-full flex items-center 
                      justify-center opacity-70 absolute right-3 top-3"
                      onClick={() => bookmarkStore.toggleBookmark(item.title)}
                    >
                      {item.isBookmarked ? (
                        <Image
                          src={bookmarkFullIcon}
                          alt="bookmark full icon"
                        />
                      ) : (
                        <Image
                          src={bookmarkEmptyIcon}
                          alt="bookmark empty icon"
                        />
                      )}
                    </div>

                    <div className="flex justify-between items-center absolute bottom-3 px-[1rem] w-full">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-[1rem]">
                          <p className="text-white text-[1.2rem] font-light">
                            {item.year}
                          </p>
                          <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                          <div className="flex items-center gap-[1rem]">
                            {item.category === "Movie" ? (
                              <Image src={movieCategoryIcon} alt="movie icon" />
                            ) : (
                              <Image src={tvCategoryIcon} alt="tv icon" />
                            )}
                            <p className="text-white text-[1.2rem] font-light">
                              {item.category}
                            </p>
                          </div>
                        </div>
                        <h3 className="text-white text-[1.5rem] font-medium">
                          {item.title}
                        </h3>
                      </div>
                      <div
                        className="bg-black w-[3.5rem] h-[2.1rem] rounded-full flex justify-center 
                      items-center opacity-70"
                      >
                        <p className="text-white text-[1.3rem] font-light opacity-100">
                          {item.rating}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
          )}
        </Swiper>
      </div>
    </div>
  );
}
