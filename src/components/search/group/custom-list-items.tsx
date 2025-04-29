import { memo, ReactNode } from "react";
import SearchCard from "./search-card";
import { translateMediaType } from "maidana07/utils/stringDto";
import { CommandGroup } from "maidana07/components/ui/command"
import { AnimatePresence } from 'framer-motion';

interface SearchResultsProps {
  listItems: MultiSearchItem[];
  heading: string;
  onSelect: (item: MultiSearchItem) => void;
  children?: ReactNode;
  nameList?: string;
}

const myCallback = ({ media_type }: MultiSearchItem) => {
  return media_type;
}

interface GroupedByMediaType {
  [key: string]: MultiSearchItem[];
}

const CustomListItems = memo(({ listItems, heading, onSelect, nameList = "list", children = "" }: SearchResultsProps) => {

  const groupedByMediaType: GroupedByMediaType = Object.groupBy(listItems, myCallback)

  return (
    <CommandGroup heading={heading}>
      <AnimatePresence>

        {Object.keys(groupedByMediaType).map(
          (type, indexType) => (
            <div key={`${nameList}-${type}-${indexType}`}
              className="grid grid-cols-1 md:grid-cols-2 md:gap-2 gap-0.5 px-1 items-center"
            >

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t col-span-full">
                <span className="bg-card  text-muted-foreground relative z-10 px-3">
                  {translateMediaType(type, true)}
                </span>
              </div>

              {
                groupedByMediaType[type].map((item, i) => (
                  <SearchCard
                    id={item.id ?? i}
                    key={`${nameList}-${item.id}-${i}`}
                    type={item.media_type}
                    title={item.title || item.name || "Desconocido"}
                    year={item.year || item.release_date || item.first_air_date}
                    image={item.poster_path || item.profile_path}
                    onSelect={() => onSelect(item)}
                    known_for_department={item.known_for_department}
                  />
                ))
              }
            </div>
          )
        )}

        {children}
      </AnimatePresence >
    </CommandGroup >
  )
})



export default CustomListItems