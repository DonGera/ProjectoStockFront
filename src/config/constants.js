const LOCAL_BACKEND_URL = "http://localhost:3000/api/v1";
const PROD_BACKEND_URL = "http://localhost:3000/api/v1";

export const BACKEND_URL =
  process.env.NODE_ENV === "prod" ? PROD_BACKEND_URL : LOCAL_BACKEND_URL;
