import { CreatedBy as CreatedByType } from "maidana07/types/TMDB/media/tv-detail"
import { FC } from "react"

export interface CreatedByProps {
  created_by?: CreatedByType[] | []
}

const CreatedBy: FC<CreatedByProps> = ({ created_by }) => {
  if (!created_by) return null;
  if (created_by.length === 0) return null;

  return (
    <div>

    </div>
  )
}

export default CreatedBy