import { Slider } from 'maidana07/components/ui/slider'
import { useState } from 'react'

const minYear = 1900

const ReleaseYearFilter = () => {
  const currentYear = new Date().getFullYear()
  const [years, setYears] = useState([minYear, currentYear])

  const handleYearChange = (values: number[]) => {
    setYears(values)
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
          value={years}
          onValueChange={handleYearChange}
          className="w-full"

        />
        <div className="flex justify-between text-sm">
          <span>{years[0]}</span>
          <span>{years[1]}</span>
        </div>
      </div>
    </div>
  )
}

export default ReleaseYearFilter