import { Button } from 'maidana07/components/ui/button'
import genres from "maidana07/lib/api/genres.json"
import { FC } from 'react'
import { useGenresFilters } from 'maidana07/hooks/use-filters'

const GenresFilter: FC<{ isMovie: boolean }> = ({ isMovie }) => {
  const { genres: selectedGenres, toggleGenre } = useGenresFilters()

  const handleClick = (genreId: number) => {
    toggleGenre(genreId.toString())
  }

  return (
    <div className="w-full">
      <h4 className="text-lg font-semibold mb-4">Géneros:</h4>
      <div className="flex flex-wrap gap-2">
        {(isMovie ? genres.movie : genres.tv).map((genre) => (
          <Button
            key={genre.id}
            variant={selectedGenres.includes(genre.id.toString()) ? "default" : "outline"}
            size="sm"
            className="rounded-full border-2 border-border"
            onClick={() => handleClick(genre.id)}
          >
            {genre.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default GenresFilter