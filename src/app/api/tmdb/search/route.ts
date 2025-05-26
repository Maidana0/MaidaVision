import tmdbFetcher from 'maidana07/lib/api/tmdb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({
      success: true,
      data: { results: [] },
      message: "Faltan parámetros (query) para buscar."
    });
  }

  const data = await tmdbFetcher.multiSearch(query);

  return NextResponse.json(data);
}