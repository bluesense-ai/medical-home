import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  id: string;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  pronouns?: string | null;
  sex?: string | null;
  picture?: string | null;
  date_of_birth: string;
  email_address: string;
  health_card_number: string;
  phone_number: string;
  registered: boolean;
  preferred_clinic_id: string;
  marital_status?: string | null;
  address?: string | null;
  city_id?: string | null;
  country_id?: string | null;
  postal_code?: string | null;
  preferred_provider_type?: string | null;
  access_token: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
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
