import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "./types";

const fetchClient = createFetchClient<paths>({
  baseUrl: "https://sandbox-backend.medicalhome.cloud/api",
});

export const api = createClient(fetchClient);

