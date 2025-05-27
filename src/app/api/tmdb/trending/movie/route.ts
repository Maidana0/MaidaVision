import tmdbFetcher from "maidana07/lib/api/tmdb";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await tmdbFetcher.getTrendingMovies()

  return NextResponse.json({
    success: data.success,
    data: data.data,
    message: data.message
  });
}