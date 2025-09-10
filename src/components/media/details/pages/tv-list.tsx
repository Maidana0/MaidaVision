import DynamicMediaGrid from "maidana07/components/media/list/dynamic-media-grid";
import tmdbFetcher from "maidana07/lib/api/tmdb";



const TVList = async () => {
  const initialData = await tmdbFetcher.getTrendingTV();
  return <DynamicMediaGrid initialData={initialData} mediaType="serie" />;
}

export default TVList;