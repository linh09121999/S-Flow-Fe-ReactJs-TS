import { create } from "zustand"

interface ResNewTitle {
    titles: number[];
    page: number;
    total_results: number;
    total_pages: number
}

interface ResNewTitleState {
    resNewTitle: ResNewTitle | undefined;
    setResNewTitle: (data: ResNewTitle) => void;
    clearResNewTitle: () => void;
}

export const useResNewTitleState = create<ResNewTitleState>((set) => ({
    resNewTitle: undefined,
    setResNewTitle: (data) => set({ resNewTitle: data }),
    clearResNewTitle: () => set({ resNewTitle: undefined })
}))

interface ResNewPeople {
    people: number[];
    page: number;
    total_results: number;
    total_pages: number
}

interface ResNewPeopleState {
    resNewPeople: ResNewPeople | undefined;
    setResNewPeople: (data: ResNewPeople) => void;
    clearResNewPeople: () => void;
}

export const useResNewPeopleState = create<ResNewPeopleState>((set) => ({
    resNewPeople: undefined,
    setResNewPeople: (data) => set({ resNewPeople: data }),
    clearResNewPeople: () => set({ resNewPeople: undefined })
}))

interface ResTitlesChangedSourcesState {
    resTitlesChangedSources: ResNewTitle | undefined;
    setResTitlesChangedSources: (data: ResNewTitle) => void;
    clearResTitlesChangedSources: () => void;
}

export const useTitlesChangedSourcesState = create<ResTitlesChangedSourcesState>((set) => ({
    resTitlesChangedSources: undefined,
    setResTitlesChangedSources: (data) => set({ resTitlesChangedSources: data }),
    clearResTitlesChangedSources: () => set({ resTitlesChangedSources: undefined })
}))

interface ResTitlesChangedDetailsState {
    resTitlesChangedDetails: ResNewTitle | undefined;
    setResTitlesChangedDetails: (data: ResNewTitle) => void;
    clearResTitlesChangedDetails: () => void;
}

export const useResTitlesChangedDetailsState = create<ResTitlesChangedDetailsState>((set) => ({
    resTitlesChangedDetails: undefined,
    setResTitlesChangedDetails: (data) => set({ resTitlesChangedDetails: data }),
    clearResTitlesChangedDetails: () => set({ resTitlesChangedDetails: undefined })
}))

interface ResTitlesChangedEpisodesState {
    resTitlesChangedEpisodes: ResNewTitle | undefined;
    setResTitlesChangedEpisodes: (data: ResNewTitle) => void;
    clearResTitlesChangedEpisodes: () => void;
}

export const useResTitlesChangedEpisodesState = create<ResTitlesChangedEpisodesState>((set) => ({
    resTitlesChangedEpisodes: undefined,
    setResTitlesChangedEpisodes: (data) => set({ resTitlesChangedEpisodes: data }),
    clearResTitlesChangedEpisodes: () => set({ resTitlesChangedEpisodes: undefined })
}))