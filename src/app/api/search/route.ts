// TMDB proxy
// import { NextResponse } from 'next/server';

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const query = searchParams.get('query');

//   const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&language=es-AR`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//       'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
//     }
//   });
//   const data = await res.json();
//   console.log(data);

//   return NextResponse.json(data);
// }

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) return NextResponse.json({ results: [] });

  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${query}&language=es-AR`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
      }
    }
  );
  const data = await res.json();
  console.log(data);
  
  return NextResponse.json(data);
}
