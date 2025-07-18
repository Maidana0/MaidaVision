import tmdbFetcher from 'maidana07/lib/api/tmdb';
import { MediaTypes } from 'maidana07/types/TMDB/search';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const [t, p] = [searchParams.get('q'), searchParams.get('type')]
  const query = searchParams.get('q');
  const type: MediaTypes | undefined = t == null ? undefined : t;
  const page: number | undefined = searchParams.get('page') == null ? undefined : Number(p);

  if (!query) {
    return NextResponse.json({
      success: true,
      data: { results: [] },
      message: "Faltan parámetros (query) para buscar."
    });
  }

  const data = await tmdbFetcher.multiSearch(query, { type, page });

  return NextResponse.json({
    success: data.success,
    data: data.data,
    message: data.message
  });
}