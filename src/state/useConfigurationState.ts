import { create } from 'zustand'

export interface ResSource {
    id: number;
    name: string;
    type: 'sub' | 'free' | 'tve' | 'purchase';
    logo_100px: string;
    ios_appstore_url: string;
    android_playstore_url: string;
    android_scheme: string;
    ios_scheme: string;
    regions: string[]
}

interface ResSourceState {
    resSources: ResSource[]; // mảng dữ liệu
    resSourcesSub: ResSource[];
    resSourcesFree: ResSource[];
    resSourcesTv2: ResSource[];
    resSourcesPurchase: ResSource[];
    setResSources: (data: ResSource[]) => void; // action cập nhật
    addReSource: (item: ResSource) => void; // thêm 1 resource
    clearReSources: () => void; // xóa hết
}

export const useResSourceState = create<ResSourceState>((set) => ({
    resSources: [],
    resSourcesSub: [],
    resSourcesFree: [],
    resSourcesTv2: [],
    resSourcesPurchase: [],
    setResSources: (data) => {
        const sub = data.filter((item) => item.type === 'sub')
        const tve = data.filter((item) => item.type === 'tve')
        const free = data.filter((item) => item.type === 'free')
        const purchase = data.filter((item) => item.type === 'purchase')
        set({
            resSources: data,
            resSourcesSub: sub,
            resSourcesFree: free,
            resSourcesTv2: tve,
            resSourcesPurchase: purchase
        })
    },
    addReSource: (item) =>
        set((state) => ({
            resSources: [...state.resSources, item]
        })),
    clearReSources: () => set({ resSources: [] })
}))

export interface ResRegion {
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

export interface ResGenre {
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