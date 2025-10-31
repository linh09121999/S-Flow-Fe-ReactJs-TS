import { create } from 'zustand'

interface State {
    selectNav: number;
    setSelectNav: (nav: number) => void;
    checkedSources: number[];
    setCheckedSources: React.Dispatch<React.SetStateAction<number[]>>;
    isCastCrew: number;
    setIsCastCrew: (isCastCrew: number) => void;
}

export const useStateGeneral = create<State>((set) => ({
    selectNav: 0,
    setSelectNav: (nav) => set({ selectNav: nav }),
    checkedSources: [],
    setCheckedSources: (value) =>
        set((state) => ({
            checkedSources:
                typeof value === "function"
                    ? (value as (prev: number[]) => number[])(state.checkedSources)
                    : value,
        })),
    isCastCrew: 0,
    setIsCastCrew: (isCheck) => set({ isCastCrew: isCheck }),
}))