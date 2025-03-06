import { create } from 'zustand';

interface UserState {
    username: string;
    setUsername: (username: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    username: '',
    setUsername: (username: string) => set({ username }),
}));
