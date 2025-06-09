import { Section } from "maidana07/components/ui/section"
import { FC, Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "maidana07/components/ui/tabs"
import { Skeleton } from "maidana07/components/ui/skeleton"
import CreditsList from "./credits-list"
import { Cast, CreatedBy, Crew } from "maidana07/types/TMDB/media/tv-detail"

interface CreditsProps {
  created_by?: CreatedBy[];
  crew: Crew[];
  cast: Cast[];
  type?: "tv" | "movie"
}
const credits: ("created_by" | "cast" | "crew")[] = ["created_by", "cast", "crew"]

const CreditsSection: FC<CreditsProps> = ({ type = "tv", created_by, crew, cast }) => {
  return (
    <Section className="flex flex-col gap-6 !pt-6 !pb-0 max-w-5xl w-[calc(100%-2rem)] mx-auto min-h-[60dvh]">
      <Suspense fallback={<Skeleton className="w-56 min-h-9" />}>
        <Tabs defaultValue={"cast"} className="relative">

          <TabsList>

            {(created_by && created_by.length >= 1) && (
              <TabsTrigger value="created_by" className="text-md font-semibold px-3 py-2.5">
                {created_by.length === 1 ? "Autor" : "Autores"}
              </TabsTrigger>
            )
            }
            <TabsTrigger value="cast" className="text-md font-semibold px-3 py-2.5">
              Reparto
            </TabsTrigger>
            <TabsTrigger value="crew" className="text-md font-semibold px-3 py-2.5">
              Equipo
            </TabsTrigger>

          </TabsList>

          {credits.map((credit_value) => (
            <TabsContent
              key={credit_value}
              value={credit_value}
            >
              <CreditsList
                items={
                  credit_value === "created_by"
                    ? created_by
                    : credit_value === "cast"
                      ? cast
                      : crew
                }
                type={credit_value}
                mediaType={type}
              />
            </TabsContent>
          ))}

        </Tabs>
      </Suspense>
    </Section >
  )
}

export default CreditsSection