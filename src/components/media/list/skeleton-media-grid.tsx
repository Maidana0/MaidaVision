import { Skeleton } from 'maidana07/components/ui/skeleton'
import { FC } from 'react';
import cn from "maidana07/utils/cn"

interface SkeletonMediaGridProps {
  containClassName?: string;
  cardClassName?: string;
  itemsLength?: number;
}

const SkeletonMediaGrid: FC<SkeletonMediaGridProps> = ({ itemsLength, containClassName, cardClassName }) => {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4", containClassName)}>
      {Array.from({ length: itemsLength ?? 20 }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("overflow-hidden bg-card relative block group rounded w-[185px] max-h-[272px] h-auto  max-w-full aspect-[2/3]", cardClassName)}
        />
      ))}
    </div>)
}

export default SkeletonMediaGrid