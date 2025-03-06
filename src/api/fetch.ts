import createFetchClient, { type Middleware } from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "./types";

const fetchClient = createFetchClient<paths>({
  baseUrl: "https://sandbox-backend.medicalhome.cloud/api",
});

export const api = createClient(fetchClient);

let accessToken = "You can put your access token here for testing purposes";

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    request.headers.set("Authorization", `Bearer ${accessToken}`);
    return request;
  },
};

fetchClient.use(authMiddleware);
