import {create} from 'zustand';

type PageStore = {
  currentPage: string,
    setCurrentPage: (page: string) => void
}

export const usePageStore = create<PageStore>((set) => ({
  currentPage: "home",
  setCurrentPage: (page) => set({currentPage: page})
}));