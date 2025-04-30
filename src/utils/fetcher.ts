


const fetcher = async <T>({ url, tags = [], errorMessage, successMessage = null, ...options }: FetcherProps): Promise<CustomResponse<T>> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout
  try {

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      next: { tags }
    });
    if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);

    clearTimeout(timeout);
    const data = await response.json();

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