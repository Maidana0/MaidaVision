import { Skeleton } from '../ui/skeleton'

const SkeletonMediaGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <Skeleton
          key={i}
          className="aspect-[2/3] bg-card"
        />
      ))}
    </div>)
}

export default SkeletonMediaGrid