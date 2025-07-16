
import HeroSection from "maidana07/components/hero-section"
import { Section } from "maidana07/components/ui/section"


export const metadata = {
  title: "Búsqueda",
  description: "Resultados de búsqueda de películas, series y personas.",
  keywords: ["búsqueda", "películas", "series", "resultados"],
}

const Busqueda = async ({ searchParams }: { searchParams: Promise<{ q: string }> }) => {
  const { q } = await searchParams

  return (
    <>
      <HeroSection
        title={`Resultados de búsqueda para: "${q}"`}
        h1ClassName={"relative !text-xl font-medium"}
      />


      <Section>

      </Section>
    </>
  )
}


export default Busqueda