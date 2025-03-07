import createFetchClient, { type Middleware } from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchClient = createFetchClient<paths>({
  baseUrl: "https://sandbox-backend.medicalhome.cloud/api",
});

export const api = createClient(fetchClient);

const AUTH_TOKEN_KEY = "medical_home_auth_token";
const HARDCODED_TOKEN =
  "You can put your access token here for testing purposes";

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const accessToken = await getAuthToken();

    if (accessToken) {
      request.headers.set("Authorization", `Bearer ${accessToken}`);
      return request;
    }

    return undefined;
  },
  async onResponse({ response }) {
    if (response.status === 401) {
      await clearAuthToken();
    }

    return response;
  },
};

fetchClient.use(authMiddleware);


const getAuthToken = async (): Promise<string | null> => {
  try {
    return (await AsyncStorage.getItem(AUTH_TOKEN_KEY)) || HARDCODED_TOKEN;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return HARDCODED_TOKEN; // Fallback to hardcoded token
  }
};

export const saveAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    console.log("Auth token saved");
  } catch (error) {
    console.error("Error saving auth token:", error);
  }
};

const clearAuthToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    console.log("Auth token cleared");
  } catch (error) {
    console.error("Error clearing auth token:", error);
  }
};
