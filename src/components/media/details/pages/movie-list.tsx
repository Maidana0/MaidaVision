import DynamicMediaGrid from "maidana07/components/media/list/dynamic-media-grid";
import tmdbFetcher from "maidana07/lib/api/tmdb";



const MovieList = async () => {
  const initialData = await tmdbFetcher.getTrendingMovies();
  return <DynamicMediaGrid initialData={initialData} mediaType="pelicula" />;
}

export default MovieList;