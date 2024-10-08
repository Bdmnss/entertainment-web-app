import Image from "next/image";
import { useRouter } from "next/navigation";
import bookmarkFullIcon from "../public/assets/icon-bookmark-full.svg";
import bookmarkEmptyIcon from "../public/assets/icon-bookmark-empty.svg";
import movieCategoryIcon from "../public/assets/icon-category-movie.svg";
import tvCategoryIcon from "../public/assets/icon-category-tv.svg";
import { useBookmarkStore } from "@/stores/bookmarkStore";
import { useWindowWidth } from "@/hooks/useWindowWidth";

interface Thumbnail {
  regular: {
    small: string;
    medium: string;
    large: string;
  };
}

interface Item {
  id: number;
  title: string;
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  thumbnail: Thumbnail;
}

interface MoviesListProps {
  item: Item;
}

const MoviesList: React.FC<MoviesListProps> = ({ item }) => {
  const router = useRouter();
  const bookmarkStore = useBookmarkStore();
  const windowWidth = useWindowWidth();

  return (
    <div
      className="w-[47%] cursor-pointer md:w-[30%] xl:w-[23%]"
      key={item.id}
      onClick={(e) => {
        if (
          (e.target as HTMLDivElement).closest("#bookmark")?.id !== "bookmark"
        ) {
          router.push(`/${item.id}`);
        }
      }}
    >
      <div
        style={{
          backgroundImage: `url(${
            windowWidth >= 768
              ? item.thumbnail.regular.medium
              : windowWidth >= 1280
              ? item.thumbnail.regular.large
              : item.thumbnail.regular.small
          })`,
        }}
        className="relative bg-cover bg-center rounded-[0.8rem] w-full h-[11rem] mb-[1rem] md:h-[14rem] 
        xl:h-[17.5rem]"
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
        <p className="text-white text-[1.1rem] font-light md:text-[1.3rem] xl:text-[1.5rem]">
          {item.year}
        </p>
        <div className="w-[3px] h-[3px] bg-white rounded-full md:w-[5px] md:h-[5px]"></div>
        {item.category === "Movie" ? (
          <Image src={movieCategoryIcon} alt="movie icon" />
        ) : (
          <Image src={tvCategoryIcon} alt="tv icon" />
        )}
        <div className="w-[3px] h-[3px] bg-white rounded-full md:w-[5px] md:h-[5px]"></div>
        <p className="text-white text-[1.1rem] font-light md:text-[1.3rem] xl:text-[1.5rem]">
          {item.rating}
        </p>
      </div>
      <h2 className="text-white text-[1.4rem] font-medium md:text-[1.8rem] xl:text-[2.4rem]">
        {item.title}
      </h2>
    </div>
  );
};

export default MoviesList;
