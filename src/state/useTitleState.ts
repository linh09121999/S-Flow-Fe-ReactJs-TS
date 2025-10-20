import { create } from "zustand"

interface ResTitleDetail {
    id: number;
    title: string;
    original_title: string;
    plot_overview: string;
    type: string;
    runtime_minutes: number;
    year: number;
    end_year: number;
    release_date: string;
    imdb_id: string;
    tmdb_id: number;
    tmdb_type: string;
    genres: number[];
    genre_names: string[];
    user_rating: number;
    critic_score: number;
    us_rating: string;
    poster: string;
    backdrop: string;
    original_language: string;
    networks: number[];
    network_names: string[];
    relevance_percentile: number
}

interface ResTitleDetailState {
    resTitleDetail: ResTitleDetail | undefined;
    setResTitleDetail: (data: ResTitleDetail) => void;
    clearResTitleDetail: () => void
}

export const useResTitleDetailState = create<ResTitleDetailState>((set) => ({
    resTitleDetail: undefined,
    setResTitleDetail: (data) => set({ resTitleDetail: data }),
    clearResTitleDetail: () => set({ resTitleDetail: undefined })
}))

interface ResTitleStreamingSource {
    source_id: number;
    name: string;
    type: string;
    region: string;
    ios_url: string;
    android_url: string;
    web_url: string;
    format: string;
    price: number | null;
    seasons: string | null;
    episodes: string | null
}

interface ResTitleStreamingSourceState {
    resTitleStreamingSourceStates: ResTitleStreamingSource[];
    setResTitleStreamingSourceStates: (data: ResTitleStreamingSource[]) => void;
    addResTitleStreamingSourceState: (item: ResTitleStreamingSource) => void;
    clearResTitleStreamingSourceStates: () => void
}

export const useResTitleStreamingSourceState = create<ResTitleStreamingSourceState>((set) => ({
    resTitleStreamingSourceStates: [],
    setResTitleStreamingSourceStates: (data) => set({ resTitleStreamingSourceStates: data }),
    addResTitleStreamingSourceState: (item) =>
        set((state) => ({
            resTitleStreamingSourceStates: [...state.resTitleStreamingSourceStates, item]
        })),
    clearResTitleStreamingSourceStates: () => set({ resTitleStreamingSourceStates: [] })
}))

interface ResTitleSeason {
    season_number: number;
    name: string;
    plot_overview: string;
    date_created: string;
    tmdb_id: number
}

interface ResTitleSeasonState {
    resTitleSeasons: ResTitleSeason[];
    setResTitleSeasons: (data: ResTitleSeason[]) => void;
    addResTitleSeason: (item: ResTitleSeason) => void;
    clearResTitleSeason: () => void
}

export const useResTitleSeasonState = create<ResTitleSeasonState>((set) => ({
    resTitleSeasons: [],
    setResTitleSeasons: (data) => set({ resTitleSeasons: data }),
    addResTitleSeason: (item) =>
        set((state) => ({
            resTitleSeasons: [...state.resTitleSeasons, item]
        })),
    clearResTitleSeason: () => set({ resTitleSeasons: [] })
}))

interface ResTitleEpisode {
    id: number;
    title: string;
    season_number: string;
    episode_number: string;
    air_date: string;
    plot_overview: string;
    tmdb_id: number
}

interface ResTitleEpisodeState {
    resTitleEpisodes: ResTitleEpisode[];
    setResTitleEpisode: (data: ResTitleEpisode[]) => void;
    addResTitleEpisode: (item: ResTitleEpisode) => void;
    clearResTitleEpisode: () => void
}

export const useResTitleEpisodeState = create<ResTitleEpisodeState>((set) => ({
    resTitleEpisodes: [],
    setResTitleEpisode: (data) => set({ resTitleEpisodes: data }),
    addResTitleEpisode: (item) =>
        set((state) => ({
            resTitleEpisodes: [...state.resTitleEpisodes, item]
        })),
    clearResTitleEpisode: () => ({ resTitleEpisodes: [] })
}))

interface Cast {
    id: number;
    name: string;
    character_name: string;
    is_male: boolean;
    tmdb_id: number
}

interface Crew {
    id: number;
    name: string;
    job: string;
    is_male: boolean;
    tmdb_id: number
}

interface ResTitleCast_Crew {
    cast: Cast[];
    crew: Crew[];
}

interface ResTitleCast_CrewState {
    resTitleCast_Crew: ResTitleCast_Crew,
    setResTitleCast_Crew: (data: ResTitleCast_Crew) => void;
    clearTitleCast_Crew: () => void
}

export const useResTitleCast_CrewState = create<ResTitleCast_CrewState>((set) => ({
    resTitleCast_Crew: {
        cast: [],
        crew: []
    },
    setResTitleCast_Crew: (data) => set({ resTitleCast_Crew: data }),
    clearTitleCast_Crew: () => set({
        resTitleCast_Crew: {
            cast: [],
            crew: []
        }
    })
}))