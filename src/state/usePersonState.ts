import { create } from "zustand"

interface ResPerson {
    id: number;
    full_name: string;
    first_name: string;
    last_name: string;
    tmdb_id: number;
    imdb_id: string;
    main_profession: string;
    secondary_profession: string;
    tertiary_profession: string;
    date_of_birth: string;
    date_of_death: null;
    place_of_birth: string;
    gender: string;
    headshot_url: string;
    known_for: number[];
    relevance_percentile: number
}

interface ResPersonState {
    resPerson: ResPerson | undefined;
    setResPerson: (data: ResPerson) => void;
    clearResPerson: () => void;
}

export const useResPersonState = create<ResPersonState>((set) => ({
    resPerson: undefined,
    setResPerson: (data) => set({ resPerson: data }),
    clearResPerson: () => set({ resPerson: undefined })
}))