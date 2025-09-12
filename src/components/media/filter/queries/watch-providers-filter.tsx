import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "maidana07/components/ui/select"
import { useWatchProvidersFilters } from "maidana07/hooks/use-filters"
import countries from "maidana07/lib/api/countries.json"

const WatchProvidersFilter = () => {
  const { watchRegion, setWatchRegion } = useWatchProvidersFilters()

  return (
    <div>
      <div className="flex justify-between">
        <h4 className="text-lg font-semibold mb-4">Disponibles en: </h4>
        <Select value={watchRegion} onValueChange={setWatchRegion}>
          <SelectTrigger className="gap-2 w-[180px]" isButtonGhost>
            <SelectValue placeholder="País" />
          </SelectTrigger>
          <SelectContent>
            {countries.countries.slice(0, 10).map((country) => (
              <SelectItem key={country.iso_3166_1} value={country.iso_3166_1}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="text-sm text-muted-foreground">
        Los proveedores de streaming se mostrarán aquí próximamente...
      </div>
    </div>
  )
}

export default WatchProvidersFilter;