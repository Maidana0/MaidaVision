import dynamic from 'next/dynamic'

const MediaHeader = dynamic(() => import("maidana07/components/media/details/media-header"), {})
const StreamingAvailability = dynamic(() => import("maidana07/components/media/details/streaming-availability"), {})
const EpisodeInfo = dynamic(() => import("maidana07/components/media/details/episode-info"), {})
const SeasonList = dynamic(() => import("maidana07/components/media/details/season-list"), {})
const ProductionInfo = dynamic(() => import("maidana07/components/media/details/production-info"), {})
const TrailerEmbed = dynamic(() => import("maidana07/components/media/details/trailer-embed"), {})
const MediaInfo = dynamic(() => import("maidana07/components/media/details/media-info"), {})
const CreditsSection = dynamic(() => import("maidana07/components/media/details/credits/credits-section"), {})
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