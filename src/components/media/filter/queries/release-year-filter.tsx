import { Slider } from 'maidana07/components/ui/slider'
import { useYearFilters } from 'maidana07/hooks/use-filters'

const minYear = 1900

const ReleaseYearFilter = () => {
  const currentYear = new Date().getFullYear()
  const { years, setYears } = useYearFilters()

  const handleYearChange = (values: number[]) => {
    setYears({ minYear: values[0], maxYear: values[1] })
  }

  return (
    <div className="w-full">
      <h4 className="text-lg font-semibold mb-4">Año de estreno: </h4>
      <div className="space-y-4 w-11/12 mx-auto">
        <Slider
          defaultValue={[minYear, currentYear]}
          min={minYear}
          max={currentYear}
          step={1}
          value={[years.minYear, years.maxYear]}
          onValueChange={handleYearChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm">
          <span>{years.minYear}</span>
          <span>{years.maxYear}</span>
        </div>
      </div>
    </div>
  )
}

export default ReleaseYearFilter