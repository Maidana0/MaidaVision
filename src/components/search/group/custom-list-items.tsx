import { memo, ReactNode } from "react";
import CommandGroup from "./command-group";
import SearchCard from "../search-card";

interface SearchResultsProps {
  listItems: MultiSearchItem[];
  heading: string;
  onSelect: (item: MultiSearchItem) => void;
  children?: ReactNode;
  nameList?: string;
}

const CustomListItems = memo(({ listItems, heading, onSelect, nameList = "list", children = "" }: SearchResultsProps) => {
  return (
    <CommandGroup heading={heading} otherChildren={children}>
      {
        listItems.map((item, i) => (
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
    </CommandGroup>
  )
})



export default CustomListItems