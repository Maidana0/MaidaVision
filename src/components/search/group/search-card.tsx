import { FC } from "react";
import { CardContent, CardDescription } from "../../ui/card";
import { CommandItem } from "../../ui/command";
import Image from "next/image";
import { translateMediaType } from "maidana07/utils/transform/stringDto";
import { motion } from 'framer-motion';

type SearchCardProps = {
  title: string;
  year?: string;
  image?: string | null;
  onSelect?: () => void;
  type?: "movie" | "tv" | "person";
  known_for_department?: string;
  id: number;
};

const SearchCard: FC<SearchCardProps> = ({
  title,
  year,
  image,
  onSelect,
  type = "movie",
  known_for_department,
  id
}) => {

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        layout: { duration: 0.3 },
        opacity: { duration: 0.2 }
      }}
      className="w-full"
    >
      <CommandItem onSelect={onSelect} className="md:h-[106px]">
        <CardContent className="flex items-center gap-3 px-0 w-full">
          <Image
            width={64}
            height={96}
            src={
              (type == "person" && !image)
                ? "/images/person2.png"
                :
                image
                  ? `https://image.tmdb.org/t/p/w92${image}`
                  : "/images/image-not-found.png"
            }
            alt={title}
            loading="lazy"
            className="w-16 h-24 object-cover rounded"
            sizes="64px"
            quality={75}
          />
          <CardDescription className="flex flex-col gap-0.5">
            <h3 className="max-h-16 text-ellipsis overflow-y-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
              {title} <span hidden>-{id}-</span>
            </h3>
            <span className="opacity-75 truncate">
              {` 
              ${translateMediaType(type)}
              ${year ? ` • ${year.slice(0, 4)}` : type === "person" ? ` • ${known_for_department}` : ""}
               `.trim()}
            </span>
          </CardDescription>
        </CardContent>
      </CommandItem>
    </motion.div >
  )
}

export default SearchCard;