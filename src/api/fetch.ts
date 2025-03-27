import createFetchClient, { type Middleware } from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "./types";
import { deleteUser, getAccessToken } from "../store/useUserStore";

const fetchClient = createFetchClient<paths>({
  baseUrl: "https://sandbox-backend.medicalhome.cloud/api",
});

export const api = createClient(fetchClient);

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const accessToken = getAccessToken();

    if (accessToken) {
      request.headers.set("Authorization", `Bearer ${accessToken}`);
      return request;
    }

    return undefined;
  },
  async onResponse({ response }) {
    if (response.status === 401) {
      deleteUser();
    }

    return response;
  },
};

fetchClient.use(authMiddleware);
