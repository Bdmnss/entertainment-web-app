"use client";

import data from "../data.json";
import Image from "next/image";
import { useBookmarkStore } from "@/stores/bookmarkStore";
import bookmarkFullIcon from "../public/assets/icon-bookmark-full.svg";
import bookmarkEmptyIcon from "../public/assets/icon-bookmark-empty.svg";

export default function MoviePage({ moviePage }: { moviePage: string }) {
  const movieIdNumber = parseInt(moviePage, 10);

  const movie = data.find((movie) => movie.id === movieIdNumber);

  const bookmarkStore = useBookmarkStore();
  return (
    <div
      className="bg-[#10141e] min-h-screen min-w-screen px-[1.3rem] pt-7 pb-10 flex flex-col gap-[2rem]
    md:px-[2.5rem] xl:pl-[12rem]"
    >
      <div className="flex flex-col gap-6 md:mt-[10rem] xl:mt-0">
        <div
          style={{
            backgroundImage: `url(${movie?.thumbnail.regular.large})`,
          }}
          className="relative bg-cover bg-center rounded-[0.8rem] h-[25rem] xl:h-[40rem]"
        >
          <div
            className="w-[3.5rem] h-[3.5rem] bg-[#10141e] rounded-full flex items-center justify-center 
            opacity-70 absolute right-3 top-3"
            onClick={() =>
              movie?.title && bookmarkStore.toggleBookmark(movie.title)
            }
          >
            {movie?.isBookmarked ? (
              <Image src={bookmarkFullIcon} alt="bookmark full icon" />
            ) : (
              <Image src={bookmarkEmptyIcon} alt="bookmark empty icon" />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[1rem]">
          <h1 className="text-[3rem] text-white font-bold">{movie?.title}</h1>
          <p className="text-[1.5rem] text-white font-light">
            {movie?.description}
          </p>
          <div>
            <h2 className="text-[3rem] text-white font-bold">Cast</h2>
            <ul>
              {movie?.cast &&
                movie.cast.map((actor, index) => (
                  <li
                    key={index}
                    className="text-[1.5rem] text-white font-light"
                  >
                    {actor.name}
                  </li>
                ))}
            </ul>
          </div>

          <div className="flex items-center gap-[1rem]">
            <p className="text-white text-[2rem] font-light">
              {movie?.category}
            </p>
            <div className="w-[8px] h-[8px] bg-white rounded-full"></div>
            <p className="text-white text-[2rem] font-light">{movie?.genre}</p>
            <div className="w-[8px] h-[8px] bg-white rounded-full"></div>
            <p className="text-white text-[2rem] font-light">{movie?.year}</p>
            <div className="w-[8px] h-[8px] bg-white rounded-full"></div>
            <p className="text-white text-[2rem] font-light">{movie?.rating}</p>
          </div>
        </div>

        <a
          target="_blank"
          href={movie?.imdbLink}
          className="bg-yellow-400 w-[30%] rounded-lg flex items-center justify-center py-2 text-black 
          font-bold text-[2rem]"
        >
          IMDB
        </a>
      </div>
      <iframe
        src={movie?.trailerLink}
        className="w-full h-[25rem]"
        allowFullScreen
      ></iframe>
    </div>
  );
}
