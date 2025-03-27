import { create } from "zustand";

interface ProviderState {
  provider: "patient" | "doctor";
  toggleProvider: () => void;
  resetProvider: () => void;
}

export const useSelectedProvider = create<ProviderState>((set) => ({
  provider: "patient",
  resetProvider: () => set({ provider: "patient" }),
  toggleProvider: () =>
    set((state) => ({
      provider: state.provider === "patient" ? "doctor" : "patient",
    })),
}));
