import { create } from "zustand"

interface Release {
    id: number;
    title: string;
    type: string;
    tmdb_id: number;
    tmdb_type: string;
    imdb_id: string;
    season_number: number;
    poster_url: string;
    source_release_date: string;
    source_id: number;
    source_name: string;
    is_original: number;
}

interface ResStreamingReleaseState {
    resStreamingRelease: Release[];
    setResStreamingRelease: (data: Release[]) => void;
    clearResStreamingRelease: () => void;
}

export const useResStreamingReleaseState = create<ResStreamingReleaseState>((set) => ({
    resStreamingRelease: [],
    setResStreamingRelease: (data) => set({ resStreamingRelease: data }),
    clearResStreamingRelease: () => set({
        resStreamingRelease: []
    })
}))