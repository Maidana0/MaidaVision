"use client"
import { Select, SelectContent as SelectContentUI, SelectItem, SelectTrigger, SelectValue } from 'maidana07/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';

type SelectContentProps = {
  items: { value: string; label: string }[]
};

const SelectContent: React.FC<SelectContentProps> = ({ items }) => {
const router = useRouter();
const searchParams = useSearchParams();

const handleSelect = (type) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set('type', type);
  router.push(`?${params.toString()}`);
};

  return (
    <Select 
    onValueChange={handleSelect}
    defaultValue={searchParams.get('type') || ''}
  >
      <SelectTrigger className="w-[180px] ml-auto">
        <SelectValue placeholder="Buscar por" />
      </SelectTrigger>
      <SelectContentUI>
      {
        items.map((item) => (
          <SelectItem key={item.value} value={item.value} className="cursor-pointer">
            {item.label}
          </SelectItem>
        ))
      }
      </SelectContentUI>
    </Select>
  );
};

export default SelectContent;