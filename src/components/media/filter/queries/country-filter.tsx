import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "maidana07/components/ui/select"
import { useOriginCountryFilters } from "maidana07/hooks/use-filters"
import countries from "maidana07/lib/api/countries.json"

const CountryFilter = () => {
  const { originCountry, setOriginCountry } = useOriginCountryFilters()

  return (
    <div className="w-full">
      <h4 className="text-lg font-semibold mb-4">País de origen:</h4>
      <Select value={originCountry} onValueChange={setOriginCountry}>
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar país" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los países</SelectItem>
          {countries.countries.map((country) => (
            <SelectItem key={country.iso_3166_1} value={country.iso_3166_1}>
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default CountryFilter