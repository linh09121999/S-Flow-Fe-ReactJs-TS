import { create } from 'zustand'

interface ResSource {
    id: number;
    name: string;
    type: string;
    logo_100px: string;
    ios_appstore_url: string;
    android_playstore_url: string;
    android_scheme:string;
    ios_scheme: string;
    regions: string[]
}

interface ResSourceState {
    resSources: ResSource[]; // mảng dữ liệu
    setResSources: (data: ResSource[]) => void; // action cập nhật
    addReSource: (item: ResSource) => void; // thêm 1 resource
    clearReSources: () => void; // xóa hết
}

export const useResSourceState = create<ResSourceState>((set) => ({
    resSources: [],
    setResSources: (data) => set({ resSources: data }),
    addReSource: (item) =>
        set((state) => ({
            resSources: [...state.resSources, item]
        })),
    clearReSources: () => set({ resSources: [] })
}))

interface ResRegion {
    country: string;
    name: string;
    flag: string;
    data_tier: number;
    plan_enabled: boolean;
}

interface ResRegionState {
    resRegions: ResRegion[];
    setResRegions: (data: ResRegion[]) => void;
    addResRegion: (item: ResRegion) => void;
    clearResRegions: () => void
}

export const useResRegionState = create<ResRegionState>((set) => ({
    resRegions: [],
    setResRegions: (data) => set({ resRegions: data }),
    addResRegion: (item) =>
        set((state) => ({
            resRegions: [...state.resRegions, item],
        })),
    clearResRegions: () => set({ resRegions: [] })
}))

interface ResNetwork {
    id: number;
    name: string;
    origin_country: string;
    tmdb_id: string;
}

interface ResNetworkState {
    resNetworks: ResNetwork[];
    setResNetworks: (data: ResNetwork[]) => void;
    addResNetwork: (item: ResNetwork) => void;
    clearResNetworks: () => void
}

export const useResNetworkState = create<ResNetworkState>((set) => ({
    resNetworks: [],
    setResNetworks: (data) => set({ resNetworks: data }),
    addResNetwork: (item) =>
        set((state) => ({
            resNetworks: [...state.resNetworks, item],
        })),
    clearResNetworks: () => set({ resNetworks: [] })
}))

interface ResGenre {
    id: number;
    name: string;
    tmdb_id: string;
}

interface ResGenresState {
    resGenres: ResGenre[];
    setResGenres: (data: ResGenre[]) => void;
    addResGenre: (item: ResGenre) => void;
    clearResGenress: () => void
}

export const useResGenresState = create<ResGenresState>((set) => ({
    resGenres: [],
    setResGenres: (data) => set({ resGenres: data }),
    addResGenre: (item) =>
        set((state) => ({
            resGenres: [...state.resGenres, item],
        })),
    clearResGenress: () => set({ resGenres: [] })
}))