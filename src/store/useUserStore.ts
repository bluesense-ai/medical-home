import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../api/types";

type UserResponse = NonNullable<
  API.paths["/auth/access_code_verification_patient/{uid}"]["post"]["responses"]["200"]["content"]["application/json"]["data"]
>;

export type UserState = {
  user:
    | ({
        id: string;
        email_address: string;
        phone_number: string;
        username: string;
        first_name: string;
        last_name: string;
        health_card_number: string;
        date_of_birth: string;
        sex: string;
        clinic: string;
        access_token: string;
        //   createdAt: string;
        //   updatedAt: string;
      } & UserResponse)
    | null;
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
