import Loader from "../ui/loader"

const LoadMoreTrigger = ({ isLoading, error, ref }: {
  isLoading: boolean
  error: string
  ref: React.RefObject<HTMLDivElement | null>
}) => (
  <div
    ref={ref}
    className="w-full flex items-center justify-center mt-8"
  >
    {(isLoading && !error)
      ? (<Loader />)
      : (<div className="text-center py-4 text-red-500">
        {error}
      </div>)
    }
  </div>
)

export default LoadMoreTrigger