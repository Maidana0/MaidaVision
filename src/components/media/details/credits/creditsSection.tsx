import { Section } from "maidana07/components/ui/section"
import CreatedBy, { CreatedByProps } from "./created-by"
import Cast, { CastProps } from "./cast"
import Crew, { CrewProps } from "./crew"
import { FC, Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "maidana07/components/ui/tabs"
import { Skeleton } from "maidana07/components/ui/skeleton"

interface CreditsProps extends CreatedByProps, CrewProps, CastProps { }

const CreditsSection: FC<CreditsProps> = ({ created_by, crew, cast }) => {
  return (
    <Section className="flex flex-col gap-6 !py-6 max-w-5xl w-[calc(100%-2rem)] mx-auto">
      <Suspense fallback={<Skeleton className="w-56 min-h-9" />}>
        <Tabs defaultValue={"cast"}>

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

          <TabsContent value="created_by">
            <CreatedBy created_by={created_by} />
          </TabsContent>
          <TabsContent value="cast">
            <Cast cast={cast} />
          </TabsContent>
          <TabsContent value="crew">
            <Crew crew={crew} />
          </TabsContent>

        </Tabs>
      </Suspense>
    </Section>
  )
}

export default CreditsSection