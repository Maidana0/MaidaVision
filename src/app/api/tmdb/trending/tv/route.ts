import tmdbFetcher from "maidana07/lib/api/tmdb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') ?? "1";

  const data = await tmdbFetcher.getTrendingTV({ page })

  return NextResponse.json({
    success: data.success,
    data: data.data,
    message: data.message
  });
}