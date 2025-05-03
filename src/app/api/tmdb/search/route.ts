import tmdbFetcher from 'maidana07/lib/api/tmdb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const response = await tmdbFetcher.multiSearch(query);

  if (response.error) {
    return NextResponse.json(
      { error: response.error.message },
      { status: response.error.status }
    );
  }

  return NextResponse.json(response.data);
}