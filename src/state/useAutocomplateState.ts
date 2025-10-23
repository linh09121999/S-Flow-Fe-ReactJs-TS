import { create } from "zustand"

interface Result {
    name: string;
    relevance: number;
    type: string;
    id: number;
    year: number;
    result_type: string;
    tmdb_id: number;
    tmdb_type: string;
    image_url: string
}


interface ResAutocomplateState {
    resAutocomplate: Result[];
    setResAutocomplate: (data: Result[]) => void;
    clearResAutocomplate: () => void
}

export const useResAutocomplateState = create<ResAutocomplateState>((set) => ({
    resAutocomplate: [],
    setResAutocomplate: (data) => set({ resAutocomplate: data }),
    clearResAutocomplate: () => set({
        resAutocomplate: []
    })
}))