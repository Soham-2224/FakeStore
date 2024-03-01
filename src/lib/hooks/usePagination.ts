import { useState, useEffect } from "react"

type PaginatedData<T> = T[] // Generic type for paginated data

const usePagination = <T>(
    data: T[],
    limit: number
): {
    currentPage: number
    totalPages: number
    paginatedData: PaginatedData<T>
    nextPage: () => void
    prevPage: () => void
} => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [startIndex, setStartIndex] = useState(0)

    useEffect(() => {
        setTotalPages(Math.ceil(data.length / limit))
        setStartIndex((currentPage - 1) * limit)
    }, [data, limit, currentPage])

    const paginatedData = data.slice(startIndex, startIndex + limit)

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
    }

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
    }

    return { currentPage, totalPages, paginatedData, nextPage, prevPage }
}

export default usePagination
