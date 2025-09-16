import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "maidana07/components/ui/select"
import { useLanguageFilters } from "maidana07/hooks/use-filters"
import languages from "maidana07/lib/api/languages.json"

const LanguageFilter = () => {
  const { language, setLanguage } = useLanguageFilters()

  return (
    <div className="w-full">
      <h4 className="text-lg font-semibold mb-4">Idioma original:</h4>
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar idioma" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los idiomas</SelectItem>
          {languages.languages.map((lang) => (
            <SelectItem key={lang.iso_639_1} value={lang.iso_639_1}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default LanguageFilter