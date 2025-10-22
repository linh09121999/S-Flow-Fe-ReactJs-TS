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

export interface ResTitleStreamingSource {
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
    resTitleStreamingSource: ResTitleStreamingSource[];
    setResTitleStreamingSource: (data: ResTitleStreamingSource[]) => void;
    addResTitleStreamingSource: (item: ResTitleStreamingSource) => void;
    clearResTitleStreamingSource: () => void
}

export const useResTitleStreamingSourceState = create<ResTitleStreamingSourceState>((set) => ({
    resTitleStreamingSource: [],
    setResTitleStreamingSource: (data) => {
        set((state) => {
            // 1️⃣ Loại bỏ trùng trong chính mảng data
            const uniqueData = Array.from(
                new Map(data.map((item) => [item.source_id, item])).values()
            );

            // 2️⃣ Lọc ra những item chưa có trong state
            const newItems = uniqueData.filter(
                (item) =>
                    !state.resTitleStreamingSource.some(
                        (p) => p.source_id === item.source_id
                    )
            );

            return {
                resTitleStreamingSource: [
                    ...state.resTitleStreamingSource,
                    ...newItems,
                ],
            };
        });
    },

    addResTitleStreamingSource: (item) =>
        set((state) => ({
            resTitleStreamingSource: [...state.resTitleStreamingSource, item]
        })),
    clearResTitleStreamingSource: () => set({ resTitleStreamingSource: [] })
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

// interface Cast {
//     id: number;
//     name: string;
//     character_name: string;
//     is_male: boolean;
//     tmdb_id: number
// }

// interface Crew {
//     id: number;
//     name: string;
//     job: string;
//     is_male: boolean;
//     tmdb_id: number
// }

interface Cast_Crew {
    person_id: number;
    type: 'Cast' | 'Crew';
    full_name: string;
    headshot_url: string;
    role: string;
    episode_count: number;
    order: 3
}

interface ResTitleCast_CrewState {
    resTitleCast: Cast_Crew[],
    setResTitleCast: (data: Cast_Crew[]) => void;
    clearTitleCast: () => void;

    resTitleCrew: Cast_Crew[];
    setResTitleCrew: (data: Cast_Crew[]) => void;
    clearTitleCrew: () => void

    setResTitleCastCrew: (data: Cast_Crew[]) => void;
}

export const useResTitleCast_CrewState = create<ResTitleCast_CrewState>((set) => ({
    resTitleCast: [],
    setResTitleCast: (data) => set({ resTitleCast: data }),
    clearTitleCast: () => set({
        resTitleCast: []
    }),
    resTitleCrew: [],
    setResTitleCrew: (data) => set({ resTitleCrew: data }),
    clearTitleCrew: () => set({
        resTitleCrew: []
    }),
    setResTitleCastCrew: (data) => {
        const cast = data.filter((item) => item.type === 'Cast');
        const crew = data.filter((item) => item.type === 'Crew');
        set({
            resTitleCast: cast,
            resTitleCrew: crew,
        });
    },
}))