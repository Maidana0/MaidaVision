import { FC, useCallback } from "react";
import { CommandItem } from "../../ui/command";
import { convertTitleToURL, translateMediaType } from "maidana07/utils/transform/stringDto";
import { motion } from 'framer-motion';
import useSearchStore from "maidana07/store/use-search-store";
import { useShallow } from "zustand/react/shallow";
import useDialogStore from "maidana07/store/use-dialog-store";
import SearchCard, { SearchCardProps } from "maidana07/components/cards/search-card";
import CustomLink from "maidana07/components/ui/custom-link"

const SearchCommand: FC<SearchCardProps> = ({
  title,
  year,
  image,
  type = "movie",
  known_for_department,
  id
}) => {
  const addToHistory = useSearchStore(useShallow(state => state.addToHistory))
  const closeSearchDialog = useDialogStore(useShallow(state => state.closeDialog))

  const handleSelect = useCallback(() => {
    addToHistory({
      title,
      year: year?.slice(0, 4) ?? "Desconocido",
      id,
      poster_path: image,
      media_type: type,
    });
    closeSearchDialog("search");
  }, [closeSearchDialog, addToHistory, id, image, title, type, year]);

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
      <CustomLink href={(`/${translateMediaType(type, false, true)
        }/${convertTitleToURL(
          title ?? "",
          Number(id))
        }`)}
      >


        <CommandItem onSelect={handleSelect} className="md:h-[106px]">
          <SearchCard
            item={{
              title,
              id,
              image,
              known_for_department,
              type,
              year
            }}
          />
        </CommandItem>


      </CustomLink>
    </motion.div >
  )
}

export default SearchCommand;