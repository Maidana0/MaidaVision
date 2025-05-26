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
    if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);

    clearTimeout(timeout);
    const data = await response.json();

    if (data.error) return {
      data: null,
      message: data.error,
      success: false
    }

    // En caso de volver a usar el fetcher en una petición al servidor
    if (typeof data.success == "boolean" && typeof data.message == "string") {
      return data;
    }

    return {
      data: response.ok ? data : null,
      message: response.ok ?
        successMessage || `${response.status}: ${response.statusText} - Operation successful`
        : `${response.status}: ${response.statusText}`,
      success: response.ok
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