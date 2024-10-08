"use client";

import data from "@/data.json";
import { usePageStore } from "@/stores/pageStore";
import { useEffect } from "react";
import MoviesList from "./MoviesList";

export default function MainContent() {
  const pageStore = usePageStore();

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (
      pageStore.currentPage === "bookmark" &&
      currentPath !== "/bookmarkPage"
    ) {
      pageStore.setCurrentPage("home");
    }
  }, [pageStore]);

  return (
    <div>
      <h2 className="text-white text-[2rem] font-light mb-[2.4rem] md:text-[3.2rem]">
        Recommended for you
      </h2>
      <div className="flex flex-wrap gap-[1.5rem] justify-center md:gap-[2.9rem]">
        {data.map((item) =>
          (pageStore.currentPage === "home" && !item.isTrending) ||
          (pageStore.currentPage === "movies" && item.category === "Movie") ||
          (pageStore.currentPage === "series" &&
            item.category === "TV Series") ? (
            <MoviesList key={item.id} item={item} />
          ) : null
        )}
      </div>
    </div>
  );
}
