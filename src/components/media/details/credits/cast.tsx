import type { Cast as CastType } from "maidana07/types/TMDB/media/tv-detail";
import { FC } from "react";

export interface CastProps {
  cast?: CastType[];
}

const Cast: FC<CastProps> = ({ cast }) => {
  if (!cast) return null;
  if (cast.length === 0) return null;

  return (
    <div>

    </div>
  )
}

export default Cast