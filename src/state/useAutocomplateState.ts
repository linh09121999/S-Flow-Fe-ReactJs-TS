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

interface ResAutocomplate {
    results: Result[]
}

interface ResAutocomplateState {
    resAutocomplate: ResAutocomplate;
    setResAutocomplate: (data: ResAutocomplate) => void;
    clearResAutocomplate: () => void
}

export const useResAutocomplateState = create<ResAutocomplateState>((set) => ({
    resAutocomplate: {
        results: []
    },
    setResAutocomplate: (data) => set({ resAutocomplate: data }),
    clearResAutocomplate: () => set({
        resAutocomplate: {
            results: []
        }
    })
}))