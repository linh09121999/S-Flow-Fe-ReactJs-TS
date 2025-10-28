import { create } from "zustand"

export interface Release {
    id: number;
    title: string;
    type: 'movie' | 'tv_series' | 'tv_special' | 'tv_miniseries' | 'short_film';
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

    resStreamingReleaseMovie: Release[],
    resStreamingReleaseTVSeries: Release[],
    resStreamingReleaseTVSpecial: Release[],
    resStreamingReleaseTVMiniseries: Release[],
    resStreamingReleaseShortFilm: Release[],

}

export const useResStreamingReleaseState = create<ResStreamingReleaseState>((set) => ({
    resStreamingRelease: [],
    resStreamingReleaseMovie: [],
    resStreamingReleaseTVSeries: [],
    resStreamingReleaseTVSpecial: [],
    resStreamingReleaseTVMiniseries: [],
    resStreamingReleaseShortFilm: [],
    setResStreamingRelease: (data) => {
        const movie = data.filter((item) => item.type === 'movie')
        const tv_series = data.filter((item) => item.type === 'tv_series')
        const tv_special = data.filter((item) => item.type === 'tv_special')
        const tv_miniseries = data.filter((item) => item.type === 'tv_miniseries')
        const short_film = data.filter((item) => item.type === 'short_film')
        set({
            resStreamingRelease: data,
            resStreamingReleaseMovie: movie,
            resStreamingReleaseTVSeries: tv_series,
            resStreamingReleaseTVSpecial: tv_special,
            resStreamingReleaseTVMiniseries: tv_miniseries,
            resStreamingReleaseShortFilm: short_film,

        })
    },
    clearResStreamingRelease: () => set({
        resStreamingRelease: []
    })
}))