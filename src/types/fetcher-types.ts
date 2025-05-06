/* eslint-disable @typescript-eslint/no-unused-vars */

interface FetcherProps extends RequestInit {
  url: string | URL;
  tags?: string[];
  revalidate?: number;
  successMessage?: string | null;
  errorMessage?: string | null;
}

interface CustomResponse<T> {
  data: T | null;
  message: string | null;
  success: boolean;
}