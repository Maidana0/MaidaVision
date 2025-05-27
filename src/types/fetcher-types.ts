
export interface FetcherProps extends RequestInit {
  url: string | URL;
  tags?: string[];
  revalidate?: number;
  successMessage?: string | null;
  errorMessage?: string | null;
}

export interface CustomResponse<T> {
  data: T | null;
  message: string | null;
  success: boolean;
  serverMessage?: string | null;
}