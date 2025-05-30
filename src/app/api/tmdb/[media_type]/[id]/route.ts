import tmdbFetcher from 'maidana07/lib/api/tmdb';
import { NextResponse } from 'next/server';


export async function GET<T>(request: Request) {
  const { pathname } = new URL(request.url);
  const [, , , mediaType, id] = pathname.split("/")

  if (mediaType != "movie" && mediaType != "tv" && mediaType != "person") {
    return NextResponse.json({
      data: false,
      message: null,
      success: "The media type is not a valid data entry. Try with: 'movie' | 'person' | 'tv'"
    })
  }

  const data = await tmdbFetcher.getMediaDetails({ mediaType, id })
  return NextResponse.json(data)
}