import { create } from "zustand"

interface Title {
    id: number;
    title: string;
    year: number;
    imdb_id: string;
    tmdb_id: number;
    tmdb_type: string;
    type: string
}

interface ResListTitle {
    titles: Title[];
    page: number;
    total_results: number;
    total_pages: number;
}

interface ResListTitleState {
    resListTitle: ResListTitle;
    setResListTitle: (data: ResListTitle) => void;
    clearResListTitle: () => void
}

export const useResListTitleState = create<ResListTitleState>((set) => ({
    resListTitle: {
        titles: [],
        page: 0,
        total_pages: 0,
        total_results: 0
    },
    setResListTitle: (data) => set({ resListTitle: data }),
    clearResListTitle: () => set({
        resListTitle: {
            titles: [],
            page: 0,
            total_pages: 0,
            total_results: 0
        }
    })
}))