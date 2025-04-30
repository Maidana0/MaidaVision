interface FetcherProps extends RequestInit {
  url: string | URL;
  tags?: string[];
  successMessage?: string | null;
  errorMessage?: string | null;
}

interface CustomResponse<T> {
  data: T | null;
  message: string | null;
  success: boolean;
}