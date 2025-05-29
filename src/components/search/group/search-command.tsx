import { FC, useCallback } from "react";
import { CommandItem } from "../../ui/command";
import { convertTitleToURL, translateMediaType } from "maidana07/utils/transform/stringDto";
import { motion } from 'framer-motion';
import useSearchStore from "maidana07/store/use-search-store";
import { useShallow } from "zustand/react/shallow";
import useDialogStore from "maidana07/store/use-dialog-store";
import { useRouter } from "next/navigation";
import SearchCard, { SearchCardProps } from "maidana07/components/cards/search-card";

const SearchCommand: FC<SearchCardProps> = ({
  title,
  year,
  image,
  type = "movie",
  known_for_department,
  id
}) => {
  const router = useRouter()
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
    router.push(`/${translateMediaType(type).toLowerCase()
      }/${convertTitleToURL(
        title ?? "",
        Number(id))
      }`);
  }, [closeSearchDialog]);

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
    </motion.div >
  )
}

export default SearchCommand;