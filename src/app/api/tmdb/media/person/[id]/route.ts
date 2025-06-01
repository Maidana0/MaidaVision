import { NextResponse } from 'next/server'
import tmdbFetcher from 'maidana07/lib/api/tmdb'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await tmdbFetcher.getMediaDetails({
    id,
    mediaType: 'person'
  })

  return NextResponse.json(data, { status: data.success ? 200 : 404 })
}