import { Skeleton } from 'maidana07/components/ui/skeleton'

const SkeletonMediaGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <Skeleton
          key={i}
          className="overflow-hidden bg-card relative block group rounded w-[185px] max-h-[272px] h-auto  max-w-full aspect-[2/3]"
        />
      ))}
    </div>)
}

export default SkeletonMediaGrid