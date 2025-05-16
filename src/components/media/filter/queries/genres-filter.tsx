import { Button } from 'maidana07/components/ui/button'
import genres from "maidana07/lib/api/genres.json"
import { FC, useState } from 'react'

const GenresFilter: FC<{ isMovie: boolean }> = ({ isMovie }) => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])

  const handledClick = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    )
  }

  return (
    <div className="w-full">
      <h4 className="text-lg font-semibold mb-4">Géneros:</h4>
      <div className="flex flex-wrap gap-2">
        {(isMovie ? genres.movie : genres.tv).map((genre) => (
          <Button
            key={genre.id}
            variant={selectedGenres.includes(genre.id) ? "default" : "outline"}
            size="sm"
            className="rounded-full border-2 border-border"
            onClick={() => handledClick(genre.id)}
          >
            {genre.name}
          </Button>
        ))}
      </div>
    </div>)
}

export default GenresFilter