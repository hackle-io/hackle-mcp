const BASE_URL = 'https://admin-api.hackle.io';
const ENVIRONMENT_KEY = process.env.ENVIRONMENT_KEY || 'PRODUCTION';
const API_KEY = process.env.API_KEY || '';

if (!API_KEY) {
  console.warn('API_KEY environment variable is not set');
}

const DEFAULT_HEADERS = {
  accept: 'application/json',
  'Content-Type': 'application/json',
  'X-HACKLE-ADMIN-API-KEY': API_KEY,
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

class WebClient {
  private static async request<T>(method: HttpMethod, path: string, options: RequestInit = {}): Promise<T> {
    const url = new URL(`${BASE_URL}${path}`);
    url.searchParams.set('environmentKey', ENVIRONMENT_KEY);

    const response = await fetch(url, {
      method,
      ...options,
      headers: {
        ...DEFAULT_HEADERS,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hackle API error! status: ${response.status} - ${errorText}`);
    }

    return (await response.json()) as T;
  }

  public static async get<T = unknown>(path: string, options?: Omit<RequestInit, 'method'>): Promise<T> {
    return this.request<T>('GET', path, options);
  }

  public static async post<T = unknown>(
    path: string,
    body?: unknown,
    options?: Omit<RequestInit, 'method' | 'body'>,
  ): Promise<T> {
    return this.request<T>('POST', path, {
      ...options,
      body: JSON.stringify(body),
      headers: {
        ...options?.headers,
      },
    });
  }

  public static async put<T = unknown>(
    path: string,
    body?: unknown,
    options?: Omit<RequestInit, 'method' | 'body'>,
  ): Promise<T> {
    return this.request<T>('PUT', path, {
      ...options,
      body: JSON.stringify(body),
      headers: {
        ...options?.headers,
      },
    });
  }

  public static async delete<T = unknown>(path: string, options?: Omit<RequestInit, 'method'>): Promise<T> {
    return this.request<T>('DELETE', path, options);
  }

  public static async patch<T = unknown>(
    path: string,
    body?: unknown,
    options?: Omit<RequestInit, 'method' | 'body'>,
  ): Promise<T> {
    return this.request<T>('PATCH', path, {
      ...options,
      body: JSON.stringify(body),
      headers: {
        ...options?.headers,
      },
    });
  }
}

export default WebClient;
