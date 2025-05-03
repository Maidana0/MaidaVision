import tmdbFetcher from "maidana07/lib/api/tmdb";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await tmdbFetcher.getTrendingMovies()

  if (response.error) {
    return NextResponse.json(
      { error: response.error.message },
      { status: response.error.status }
    );
  }

  return NextResponse.json(response.data);
}