import { create } from "zustand"

interface TitleResult {
    id: number;
    name: string;
    type: string;
    year: number;
    imdb_id: string;
    tmdb_id: number;
    tmdb_type: string
}

interface PeopleResult {
    id: number;
    name: string;
    main_profession: string;
    imdb_id: string;
    tmdb_id: number
}

interface ResSearch {
    title_results: TitleResult[],
    people_results: PeopleResult[]
}

interface ResSearchState {
    resSearch: ResSearch;
    setResSearch: (data: ResSearch) => void;
    clearResSearch: () => void;
}

export const useResSearchState = create<ResSearchState>((set) => ({
    resSearch: {
        title_results: [],
        people_results: [],
    },
    setResSearch: (data) => set({ resSearch: data }),
    clearResSearch: () => set({
        resSearch: {
            title_results: [],
            people_results: [],
        },
    })
}))