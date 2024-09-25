import {create} from 'zustand';
import data from "../data.json"

type BookmarkStore = {
  data: typeof data,
  toggleBookmark: (title: string) => void
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  data,
  toggleBookmark: (title) => {
    set((state) => {
      const item = state.data.find((item) => item.title === title);
      if (item) {
        item.isBookmarked = !item.isBookmarked;
      }
      return {data: [...state.data]};
    });
  }
}));
