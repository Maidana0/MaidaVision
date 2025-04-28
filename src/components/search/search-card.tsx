import { FC } from "react";
import { Card, CardContent, CardDescription } from "../ui/card";
import { CommandItem } from "../ui/command";
import Image from "next/image";

type SearchCardProps = {
  title: string;
  year?: string;
  image?: string | null;
  onClick?: () => void;
  type?: "movie" | "tv" | "person";
};

const SearchCard: FC<SearchCardProps> = ({
  title,
  year,
  image,
  onClick,
  type = "movie"
}) => {

  return (
    <Card
      animated
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full"
    >
      <CommandItem onSelect={onClick} className="md:min-h-[120px]"
      >
        <CardContent className="flex items-center gap-3 px-0 w-full">
          <Image
            width={64}
            height={96}
            src={
              type == "person"
                ? "/images/person2.png"
                :
                image
                  ? `https://image.tmdb.org/t/p/w92${image}`
                  : "/images/image-not-found.png"
            }
            alt={title}
            className={"w-16 max-h-24 object-cover rounded"}
            loading="lazy"
          />
          <CardDescription className="flex flex-col gap-0.5">
            <h3 className="max-h-16 text-ellipsis overflow-y-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
              {title}
            </h3>
            <span className="opacity-75 truncate">
              {` ${type === 'movie' ? 'Película' : type === "tv" ? 'Serie' : "Persona"
                }${year ? `  •  ${year.slice(0, 4)}` : " "}`
              }
            </span>
          </CardDescription>
        </CardContent>
      </CommandItem>
    </Card>
  )
}

export default SearchCard;