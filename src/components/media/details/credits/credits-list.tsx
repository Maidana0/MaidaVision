"use client"
import { Cast, Crew } from "maidana07/types/TMDB/media/tv-detail";
import { CreatedBy } from "maidana07/types/TMDB/media/common/common-types"
import { FC, useState } from "react";
import { Button } from "maidana07/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import PersonCard from "maidana07/components/cards/person-card";
import { MovieCast, MovieCrew } from "maidana07/types/TMDB/media/movie-detail"
/* eslint-disable  @typescript-eslint/no-explicit-any */

interface CreditsListProps {
  items?: Array<CreatedBy | Crew | Cast | MovieCast | MovieCrew>;
  mediaType?: "tv" | "movie";
  type: "created_by" | "crew" | "cast";
}

// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
// @ts-ignore
function getDescription(type: "created_by" | "crew" | "cast", person: any, mediaType: "tv" | "movie" = "tv"): string {
  if (type === "created_by") return "Creador";
  if (mediaType && mediaType === "movie") {
    if (type === "cast") return person.character
    if (type === "crew") return person.job
  }
  if (mediaType === "tv") {
    if (type === "cast") return person.roles[0]?.character ?? "";
    return person.jobs[0]?.job ?? ""
  }
  return " "
}


const CreditsList: FC<CreditsListProps> = ({ items, type, mediaType }) => {
  const [loadMore, setLoadMore] = useState<boolean>(false);
  if (!items) return null;
  if (items.length === 0) return null;


  return (
    <div className="w-full text-center">

      <div className="my-4 flex flex-wrap gap-x-3 gap-y-8 w-full mx-auto max-w-[900px] md:justify-start justify-center">


        {items.slice(0, 6)
          .map((person, i) => (
            <PersonCard
              key={person.id + "-" + i}
              name={person.name}
              image={person.profile_path}
              description={getDescription(type, person, mediaType)}
            />
          ))}

        {items.length >= 6 && loadMore && (
          <AnimatePresence>
            {items.slice(6, Math.min(items.length, 24))
              .map((person, i) => (
                <motion.div
                  key={person.id + "-" + i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: i * 0.1 }}
                >
                  <PersonCard
                    name={person.name}
                    image={person.profile_path}
                    description={getDescription(type, person, mediaType)}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        )}

      </div>

      {items.length > 6 &&
        <Button
          variant={"outline"}
          className="my-5"
          onClick={() => setLoadMore((prev) => !prev)}
        >
          Mostrar {!loadMore ? "más" : "menos"}
        </Button>
      }
    </div>
  )
}

export default CreditsList