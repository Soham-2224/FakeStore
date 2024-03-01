import { useEffect, useRef } from "react"

type GenericFunction<T extends any[]> = (...args: T) => void

const useDebounce = <T extends any[]>(callback: GenericFunction<T>, delay: number): GenericFunction<T> => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    const debouncedCallback = (...args: T) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }

    return debouncedCallback
}

export default useDebounce

// NOTE: we could use this debounce function, we were to search the data from an api