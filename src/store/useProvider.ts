import { create } from "zustand";

interface ProviderState {
  provider: "patient" | "doctor";
  toggleProvider: () => void;
}

export const useProvider = create<ProviderState>((set) => ({
  provider: "patient",
  toggleProvider: () =>
    set((state) => ({
      provider: state.provider === "patient" ? "doctor" : "patient",
    })),
}));
