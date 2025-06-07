import type { Crew as CrewType } from "maidana07/types/TMDB/media/tv-detail";
import { FC } from "react";

export interface CrewProps {
  crew?: CrewType[];
}

const Crew: FC<CrewProps> = ({ crew }) => {
  if (!crew) return null;
  if (crew.length === 0) return null;

  return (
    <div>

    </div>
  )
}

export default Crew