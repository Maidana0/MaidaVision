import dynamic from 'next/dynamic'
import MediaHeader from "maidana07/components/media/details/media-header";
import StreamingAvailability from "maidana07/components/media/details/streaming-availability";
import EpisodeInfo from "maidana07/components/media/details/episode-info";
import SeasonList from "maidana07/components/media/details/season-list";
import ProductionInfo from "maidana07/components/media/details/production-info";
import TrailerEmbed from "maidana07/components/media/details/trailer-embed";
import MediaInfo from "maidana07/components/media/details/media-info";
import CreditsSection from "maidana07/components/media/details/credits/credits-section";
const CollectionBanner = dynamic(() => import("maidana07/components/media/details/collection-banner"), {})


export {
  MediaHeader,
  StreamingAvailability,
  EpisodeInfo,
  SeasonList,
  ProductionInfo,
  TrailerEmbed,
  MediaInfo,
  CreditsSection,
  CollectionBanner
}