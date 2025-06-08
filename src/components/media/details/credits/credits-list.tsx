"use client"
import { Cast, CreatedBy, Crew } from 'maidana07/types/TMDB/media/tv-detail';
import { FC, useState } from "react";
import { Button } from "maidana07/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import PersonCard from 'maidana07/components/cards/person-card';

interface CreditsListProps {
  items?: Array<CreatedBy | Crew | Cast>,
  type: "created_by" | "crew" | "cast"
}


const CreditsList: FC<CreditsListProps> = ({ items, type }) => {
  if (!items) return null;
  if (items.length === 0) return null;

  const [loadMore, setLoadMore] = useState<Boolean>(false);

  return (
    <div className="w-full text-center">

      <div className="my-4 flex flex-wrap gap-x-3 gap-y-8 w-full mx-auto max-w-[900px] md:justify-start justify-center">


        {items.slice(0, 6)
          .map((person, i) => (
            <PersonCard
              key={person.id + "-" + i}
              arrayType={type}
              person={person}
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
                    arrayType={type}
                    person={person}
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