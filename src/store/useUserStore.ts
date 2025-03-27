import { create } from "zustand";
import { persist } from "zustand/middleware";
import API from "../api/types";
import { storage } from "./asyncStorage";

type PatientResponse = NonNullable<
  API.paths["/auth/access_code_verification_patient/{uid}"]["post"]["responses"]["200"]["content"]["application/json"]["data"]
>;

type ProviderResponse = NonNullable<
  API.paths["/auth/verify-verification-code-provider"]["post"]["responses"]["200"]["content"]["application/json"]["data"]
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
  } & PatientResponse)
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
      storage,
    }
  )
);

export type PatientState = {
  patient: PatientResponse | null;
  setPatient: (patient: PatientResponse | null) => void;
};

export const usePatientStore = create<PatientState>()(
  persist(
    (set) => ({
      patient: null,
      setPatient: (patient) => set({ patient }),
    }),
    {
      name: "patient-storage",
      storage,
    }
  )
);

export type ProviderState = {
  provider:
  | (ProviderResponse["user"] & {
    access_token: ProviderResponse["access_token"];
  })
  | null;
  setProvider: (provider: ProviderResponse | null) => void;
};


export const useProviderStore = create<ProviderState>()(
  persist(
    (set) => ({
      provider: null,
      setProvider: (provider) => set({
        provider: provider === null ? null : { ...provider.user, access_token: provider.access_token }
      }),
    }),
    {
      name: "provider-storage",
      storage,
    }
  )
);