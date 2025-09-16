"use client"
import { Cast, Crew } from "maidana07/types/TMDB/media/tv-detail";
import { CreatedBy } from "maidana07/types/TMDB/media/common/common-types"
import { FC, useState } from "react";
import { Button } from "maidana07/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import PersonCard from "maidana07/components/cards/person-card";
import { MovieCast, MovieCrew } from "maidana07/types/TMDB/media/movie-detail"
import CustomLink from "maidana07/components/ui/custom-link";

type TypesOfPerson = CreatedBy | Crew | Cast | MovieCast | MovieCrew

interface CreditsListProps {
  items?: Array<TypesOfPerson>;
  mediaType?: "tv" | "movie";
  type: "created_by" | "crew" | "cast";
}

function getDescription(type: "created_by" | "crew" | "cast", person: TypesOfPerson, mediaType: "tv" | "movie" = "tv"): string {
  if (type === "created_by") return "Creador";
  if (mediaType && mediaType === "movie") {
    if ("character" in person) return person.character
    if ("job" in person) return person.job
  }
  if (mediaType === "tv") {
    if ("roles" in person) return person.roles[0]?.character ?? "";
    else if ("jobs" in person) return person.jobs[0]?.job ?? "";
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
          .map((person) => (
            <CustomLink key={person.id}
              href={`/persona/${person.id}-${person.name.replaceAll(" ", "-").toLowerCase()}`}
            >
              <PersonCard
                name={person.name}
                image={person.profile_path}
                description={getDescription(type, person, mediaType)}
              />
            </CustomLink>

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
                  <CustomLink
                    href={`/persona/${person.id}-${person.name.replaceAll(" ", "-").toLowerCase()}`}
                  >
                    <PersonCard
                      name={person.name}
                      image={person.profile_path}
                      description={getDescription(type, person, mediaType)}
                    />
                  </CustomLink>
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