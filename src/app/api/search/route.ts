import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) return NextResponse.json({ results: [] });
  let url = `https://api.themoviedb.org/3/search/multi?query=${query}&language=es-AR&page=1&include_adult=false`

  const res = await fetch(
    url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
    }
  }
  );
  const data: SearchResponse = await res.json();
  return NextResponse.json(data);
}
