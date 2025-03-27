import { create } from "zustand";
import { persist } from "zustand/middleware";
import API from "../api/types";
import { storage } from "./asyncStorage";
import { useSelectedProvider } from "./useProvider";

type PatientResponse = NonNullable<
  API.paths["/auth/access_code_verification_patient/{uid}"]["post"]["responses"]["200"]["content"]["application/json"]["data"]
>;

type ProviderResponse = NonNullable<
  API.paths["/auth/verify-verification-code-provider"]["post"]["responses"]["200"]["content"]["application/json"]["data"]
>;

export type PatientState = {
  patient: PatientResponse | null;
  setPatient: (patient: PatientResponse | null) => void;
  updatePatient: (patient: Partial<PatientResponse>) => void;
};

export const usePatientStore = create<PatientState>()(
  persist(
    (set) => ({
      patient: null,
      setPatient: (patient) => set({ patient }),
      updatePatient: (patient) => set(s => ({ patient: { ...s.patient!, ...patient } }))
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
      setProvider: (provider) =>
        set({
          provider:
            provider === null
              ? null
              : { ...provider.user, access_token: provider.access_token },
        }),
    }),
    {
      name: "provider-storage",
      storage,
    }
  )
);

export function getAccessToken() {
  const provider = useSelectedProvider.getState().provider;
  const state =
    provider === "patient"
      ? usePatientStore.getState().patient
      : useProviderStore.getState().provider;
  return state?.access_token;
}
export function deleteUser() {
  const provider = useSelectedProvider.getState().provider;
  if (provider === "patient") {
    usePatientStore.getState().setPatient(null)
  } else {
    useProviderStore.getState().setProvider(null)
  }
}