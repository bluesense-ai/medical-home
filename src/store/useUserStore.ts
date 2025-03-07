import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserState = {
  user: {
    id: string;
    email_address: string;
    phone_number: string;
    username: string;
    clinic: string;
    access_token: string;
    //   createdAt: string;
    //   updatedAt: string;
  } | null;
  setUser: (user: Partial<UserState["user"]>) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) =>
        set({
          user: (user === null ? null : { ...user }) as UserState["user"],
        }),
    }),
    {
      name: "user-storage",
      storage: {
        getItem: async (name: string) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name: string, value: any) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name: string) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);
