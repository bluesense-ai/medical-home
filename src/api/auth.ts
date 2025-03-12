/**
 * Authentication API Service
 * Handles all authentication related API calls using React Query
 */
import { api } from "./fetch";
import { useUserStore } from "../store/useUserStore";

/**
 * Hook for patient registration
 * @returns Registration mutation object
 */
export const usePatientRegistration = () => {
  return api.useMutation("post", "/auth/patient-register", {
    onError: (error) => {
      console.error("Patient registration error:", error);
    },
  });
};

/**
 * Hook for admin registration
 * @returns Registration mutation object
 */
export const useAdminRegistration = () => {
  return api.useMutation("post", "/auth/admin-register", {
    onError: (error) => {
      console.error("Admin registration error:", error);
    },
  });
};

/**
 * Hook for admin login
 * @returns Login mutation object
 */
export const useAdminLogin = () => {
  return api.useMutation("post", "/auth/admin-login", {
    onError: (error) => {
      console.error("Admin login error:", error);
    },
  });
};

/**
 * Hook for verifying admin access code
 * @returns Verification mutation object
 */
export const useVerifyAdminAccessCode = () => {
  const setUser = useUserStore((state) => state.setUser);

  return api.useMutation("post", "/auth/verify-access-code-admin", {
    onSuccess: (response: any) => {
      if (response.data?.data) {
        const userData = response.data.data;
        setUser({
          id: userData.id,
          email_address: userData.email,
          phone_number: userData.phone_number,
          username: userData.username,
          clinic: "", // Admin doesn't have a clinic
          access_token: userData.access_token,
        });
      }
    },
    onError: (error) => {
      console.error("Admin verification error:", error);
    },
  });
};

// Types for patient registration
interface PatientRegisterData {
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: string;
  healthCardNumber: string;
  mobileNumber: string;
  emailAddress: string;
  otpChannel: string;
  preferredClinicId: string;
}

// Types for patient login
interface PatientLoginData {
  healthCardNumber: string;
  otpChannel: string;
}

/**
 * Custom hook for patient registration
 * Uses mutation pattern for optimized API calls
 */
export const usePatientRegister = () => {
  return api.useMutation(
    'post',
    '/auth/patient-register',
    {
      onSuccess: (response: any) => {
        console.log('Registration Success:', response);
        // You can handle success actions here
      },
      onError: (error: any) => {
        console.error('Registration Error:', error);
        // You can handle error actions here
      }
    }
  );
};

/**
 * Custom hook for patient login
 * Uses mutation pattern for optimized API calls
 */
export const usePatientLogin = () => {
  return api.useMutation(
    'post',
    '/auth/patient-login',
    {
      onSuccess: (response: any) => {
        console.log('Login Success:', response);
        // You can handle success actions here
      },
      onError: (error: any) => {
        console.error('Login Error:', error);
        // You can handle error actions here
      }
    }
  );
};

/**
 * Hook for verifying patient access code
 * @returns Verification mutation object
 */
export const useVerifyPatientAccessCode = () => {
  const setUser = useUserStore((state) => state.setUser);

  return api.useMutation(
    "post",
    "/auth/access_code_verification_patient/{uid}",
    {
      onSuccess: (response: any) => {
        if (response.data?.data) {
          setUser(response.data.data);
        }
      },
      onError: (error, variables) => {
        console.error("Patient verification error:", error, variables);
      },
    }
  );
};

/**
 * Hook for provider login
 * @returns Login mutation object
 */
export const useProviderLogin = () => {
  return api.useMutation("post", "/auth/provider-login", {
    onError: (error) => {
      console.error("Provider login error:", error);
    },
  });
};

/**
 * Hook for verifying provider access code
 * @returns Verification mutation object
 */
export const useVerifyProviderAccessCode = () => {
  const setUser = useUserStore((state) => state.setUser);

  return api.useMutation("post", "/auth/verify-verification-code-provider", {
    onSuccess: (response: any) => {
      if (response.data?.data) {
        setUser(response.data.data);
      }
    },
    onError: (error) => {
      console.error("Provider verification error:", error);
    },
  });
};

/**
 * Hook for fetching all clinics
 * @returns Query result with clinics data
 */
export const useClinics = () => {
  return api.useQuery("get", "/clinics/get-all-clinics");
};

export default {
  usePatientRegistration,
  useAdminRegistration,
  useAdminLogin,
  useVerifyAdminAccessCode,
  usePatientRegister,
  usePatientLogin,
  useVerifyPatientAccessCode,
  useProviderLogin,
  useVerifyProviderAccessCode,
  useClinics,
}; 