import { create } from 'zustand'

interface State {
    selectNav: number;
    setSelectNav: (nav: number) => void
}

export const useStateGeneral = create<State>((set) => ({
    selectNav: 0,
    setSelectNav: (nav) => set({ selectNav: nav })
}))