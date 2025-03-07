import createFetchClient, { type Middleware } from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "./types";
import { useUserStore } from "../store/useUserStore";

const fetchClient = createFetchClient<paths>({
  baseUrl: "https://sandbox-backend.medicalhome.cloud/api",
});

export const api = createClient(fetchClient);

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const accessToken = useUserStore.getState().user?.access_token;

    if (accessToken) {
      request.headers.set("Authorization", `Bearer ${accessToken}`);
      return request;
    }

    return undefined;
  },
  async onResponse({ response }) {
    if (response.status === 401) {
      useUserStore.getState().setUser(null);
    }

    return response;
  },
};

fetchClient.use(authMiddleware);
