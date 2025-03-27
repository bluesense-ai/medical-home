import { Alert } from "react-native";
import { usePatientStore, useProviderStore } from "../store/useUserStore";
import { api } from "./fetch";

export const usePatientRegister = () => {
  return api.useMutation("post", "/auth/patient-register");
};

export const usePatientLogin = () => {
  return api.useMutation("post", "/auth/patient-login", {
    onSuccess: (response: any) => {
      console.log("Login Success:", response);
      // You can handle success actions here
    },
    onError: (error, variables) => {
      console.error("Login Error:", error, variables);
      // You can handle error actions here
    },
  });
};


export const useVerifyPatientAccessCode = () => {
  const setPatient = usePatientStore((state) => state.setPatient);

  return api.useMutation(
    "post",
    "/auth/access_code_verification_patient/{uid}",
    {
      onSuccess: ({ data }) => {
        if (data) {
          setPatient(data);
        }
      },
      onError: (error, variables) => {
        console.error("API Error:", error);
        Alert.alert(
          "Error",
          error.message || "Verification failed. Please try again."
        );
      },
    }
  );
};


export const useProviderLogin = () => {
  return api.useMutation("post", "/auth/provider-login", {
    onError: (error) => {
      console.error("Provider login error:", error);
    },
  });
};


export const useVerifyProviderAccessCode = () => {
  const setProvider = useProviderStore((state) => state.setProvider);

  return api.useMutation("post", "/auth/verify-verification-code-provider", {
    onSuccess: ({ data }) => {
      if (data) {
        setProvider(data);
      }
    },
    onError: (error) => {
      console.error("Provider verification error:", error);
    },
  });
};


export const useUpdateCurrentPatientProfile = () => {
  const updatePatient = usePatientStore((state) => state.updatePatient);

  return api.useMutation(
    "put",
    "/patients/patient-update/{health_card_number}",
    {
      onSuccess(data) {
        console.log("Profile Update Response:", data);
        updatePatient(data);
      },
      onError: (error, variables) => {
        console.error("Update Error Details:", {
          error,
          health_card_number: variables.params.path.health_card_number,
        });
      },
    }
  );
};
