const BASE_URL = "https://admin-api.hackle.io";
const ENVIRONMENT_KEY = process.env.ENVIRONMENT_KEY || "production";
const DEFAULT_HEADERS = {
  accept: "application/json",
  "X-HACKLE-ADMIN-API-KEY": process.env.API_KEY || "",
};

class WebClient {
  public static async get<T = any>(
    path: string,
    options?: Parameters<typeof fetch>[1]
  ) {
    const url = new URL(`${BASE_URL}${path}`);
    url.searchParams.set("environmentKey", ENVIRONMENT_KEY);

    const response = await fetch(url, {
      method: "GET",
      ...options,
      headers: {
        ...DEFAULT_HEADERS,
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Hackle API error! status: ${response.status} - ${errorText}`
      );
    }

    return (await response.json()) as T;
  }
}

export default WebClient;
