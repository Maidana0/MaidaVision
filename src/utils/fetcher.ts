import { CustomResponse, FetcherProps } from "maidana07/types/fetcher-types";



const fetcher = async <T>({ url, tags = [], revalidate, errorMessage, successMessage = null, ...options }: FetcherProps): Promise<CustomResponse<T>> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      next: { tags, revalidate }
    });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);

    const data = await response.json();

    // Si la respuesta ya tiene success/data/message, simplemente retorna eso
    if (typeof data.success === "boolean"
      && "data" in data
      && "message" in data
    ) {
      return {
        data: data.data,
        success: data.success,
        message: data.success
          ? successMessage ?? data.message
          : errorMessage ?? data.message,
        serverMessage: data.message
      };
    }

    // Si no, adapta (esto solo debería pasar con APIs externas)
    return {
      data: response.ok ? data : null,
      success: response.ok,
      message: response.ok
        ? successMessage || response.status && response.statusText
          ? `${response.status}: ${response.statusText} - Operation successful` : "OK"
        : errorMessage || response.status && response.statusText
          ? `${response.status}: ${response.statusText} - Operation failed` : "Error"
    };
  } catch (error) {
    clearTimeout(timeout);
    return {
      data: null,
      message: error instanceof Error ? error.message : errorMessage || 'Internal Server Error',
      success: false
    };
  }
};

export default fetcher;