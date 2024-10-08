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
import { useRouter } from "next/navigation";
import { useWindowWidth } from "@/hooks/useWindowWidth";

export default function Slider() {
  const bookmarkStore = useBookmarkStore();
  const pageStore = usePageStore();
  const router = useRouter();
  const windowWidth = useWindowWidth();
  return (
    <div className={`${pageStore.currentPage !== "home" ? "hidden" : ""}`}>
      <h2 className="text-white text-[2rem] font-light mb-[1.6rem] md:text-[3.2rem]">
        Trending
      </h2>
      <div>
        <Swiper
          slidesPerView={1.4}
          spaceBetween={16}
          breakpoints={{
            768: {
              spaceBetween: 40,
              slidesPerView: 1.5,
            },
            1280: {
              spaceBetween: 40,
              slidesPerView: 2.5,
            },
          }}
          className="h-[14rem] md:h-[23rem]"
        >
          {data.map(
            (item) =>
              item.isTrending && (
                <SwiperSlide key={item.id}>
                  <div
                    style={{
                      backgroundImage: `url(${
                        windowWidth >= 768
                          ? item.thumbnail.trending?.large
                          : item.thumbnail.trending?.small
                      })`,
                    }}
                    className="relative bg-cover bg-center rounded-[0.8rem] h-full cursor-pointer"
                    onClick={(e) => {
                      if (
                        (e.target as HTMLDivElement).closest("#bookmark")
                          ?.id !== "bookmark"
                      ) {
                        router.push(`/${item.id}`);
                      }
                    }}
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
                          <p className="text-white text-[1.1rem] font-light md:text-[1.3rem] xl:text-[1.5rem]">
                            {item.year}
                          </p>
                          <div className="w-[3px] h-[3px] bg-white rounded-full md:w-[5px] md:h-[5px]"></div>
                          <div className="flex items-center gap-[1rem]">
                            {item.category === "Movie" ? (
                              <Image src={movieCategoryIcon} alt="movie icon" />
                            ) : (
                              <Image src={tvCategoryIcon} alt="tv icon" />
                            )}
                            <div className="w-[3px] h-[3px] bg-white rounded-full md:w-[5px] md:h-[5px]"></div>
                            <p className="text-white text-[1.1rem] font-light md:text-[1.3rem] xl:text-[1.5rem]">
                              {item.category}
                            </p>
                          </div>
                        </div>
                        <h3 className="text-white text-[1.4rem] font-medium md:text-[1.8rem] xl:text-[2.4rem]">
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
