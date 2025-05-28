"use client"
import { useCallback, useEffect, useRef, useState, useTransition } from "react"

interface UseInfinityScrollProps<T> {
  initialState: T[];
  initialHasMorePage: boolean,
  cb: (nextPage: number) => Promise<{
    items: T[],
    success: boolean,
    hasMorePages: boolean,
    message: string | null
  }>;
}
const DEFAULT_OPTIONS = {
  threshold: 0.1,
  rootMargin: '150px',
  startPage: 2 // la primera va a ser cargada por el server... en teoria ah
} as const

export const useInfinityScroll = <T extends { id: number }>({
  initialState = [],
  initialHasMorePage,
  cb
}: UseInfinityScrollProps<T>) => {
  const [items, setItems] = useState<T[]>(() => initialState)
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_OPTIONS.startPage)
  const [hasMore, setHasMore] = useState<boolean>(initialHasMorePage)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [isPending, startTransition] = useTransition()


  // Refs para manejo de observadores y controladores
  const observer = useRef<IntersectionObserver>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  // Set para trackear IDs únicos
  const seenIds = useRef(new Set(initialState.map((item) => item.id)))


  const loadMoreItems = useCallback(async (pageNum: number) => {
    if (!hasMore || isPending) return

    try {
      const { success, hasMorePages, items: newItems, message } = await cb(pageNum)

      if (!success) {
        setErrorMessage(message ?? "Error al cargar más contenido")
        return
      }

      startTransition(() => {
        // Filtrar duplicados usando el Set de IDs
        const uniqueItems = newItems.filter(item => {
          if (seenIds.current.has(item.id)) {
            if (process.env.NEXT_PUBLIC_NODE_ENV == "development") console.error("repetido con id: ", item.id);
            return false
          }

          seenIds.current.add(item.id)
          return true
        })

        if (uniqueItems.length > 0) {
          setItems(prev => [...prev, ...uniqueItems])
          setCurrentPage(prev => prev + 1)
        }

        setHasMore(hasMorePages && uniqueItems.length > 0)
      })
    } catch (err) {
      setErrorMessage("Error de conexión")
      console.error('Load error:', err)
    }
  }, [cb, hasMore, isPending])


  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isPending) {
          loadMoreItems(currentPage)
        }
      },
      DEFAULT_OPTIONS
    )

    observer.current.observe(target)


    return () => {
      observer.current?.disconnect()
    }

  }, [currentPage, hasMore, isPending, loadMoreItems])

  const reset = useCallback((newInitialState?: T[]) => {
    seenIds.current.clear()

    const initialItems = newInitialState ?? initialState

    initialItems.forEach(item => seenIds.current.add(item.id))

    setItems(initialItems)
    setCurrentPage(DEFAULT_OPTIONS.startPage)
    setHasMore(true)
    setErrorMessage("")
  }, [initialState])

  return {
    items,
    isPending,
    targetRef,
    reset,
    errorMessage
  } as const
}
