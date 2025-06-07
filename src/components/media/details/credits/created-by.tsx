"use client"
import PersonCard from "maidana07/components/cards/person-card";
import { CreatedBy as CreatedByType } from "maidana07/types/TMDB/media/tv-detail"
import { FC } from "react"

export interface CreatedByProps {
  created_by?: CreatedByType[] | []
}

const CreatedBy: FC<CreatedByProps> = ({ created_by }) => {
  if (!created_by) return null;
  if (created_by.length === 0) return null;
  return (
    <div className="my-2 p-4 flex flex-nowrap gap-6 overflow-x-auto w-full">
      {
        created_by.map(creator => (<PersonCard key={creator.id} person={creator} arrayType="created-by" />))
      }
    </div>
  )
}

export default CreatedBy