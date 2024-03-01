import { useSearchParams } from "react-router-dom"

// --lib--
import usePagination from "@/lib/hooks/usePagination"

// --rtk--
import { useGetAllProductsQuery } from "@/store/services/product"

// --components--
import ProductCard from "./ProductCard"
import CardSkeleton from "@/components/shared/Skeletons/CardSkeleton"

// --icons--
import Pagination from "../shared/Pagination"
import { useEffect, useState } from "react"
import { productType } from "@/types"

const Products = () => {
    let [searchParams] = useSearchParams()

    const searchValue = searchParams.get("search")
    const category = searchParams.get("category")
    const sort_by = (searchParams.get("sort_by") ?? "asc") as "asc" | "desc"

    const { data = [], isLoading } = useGetAllProductsQuery(
        { category, sort_by },
        {
            refetchOnMountOrArgChange: true
        }
    )

    const [filteredData, setFilteredData] = useState<productType[]>(data)

    useEffect(() => {
        if (!data.length) return

        if (!searchValue) {
            setFilteredData(data)
            return
        }

        const filteredArr = data.filter((product) => product.title.toLowerCase().includes(searchValue.toLowerCase()))

        setFilteredData(filteredArr)
    }, [data, searchValue])

    const { paginatedData, currentPage, nextPage, prevPage, totalPages } = usePagination(filteredData, 8)

    if (isLoading) {
        return (
            <div className=" mt-8">
                <div className="w-full grid grid-cols-4 gap-6">
                    {new Array(8).fill(true).map((_, idx) => (
                        <CardSkeleton key={idx} />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className=" mt-8">
            <div className="w-full grid grid-cols-4 gap-6">
                {!paginatedData.length ? (
                    <h1>No products found</h1>
                ) : (
                    paginatedData.map((product) => (
                        <ProductCard
                            data={product}
                            key={product.id}
                        />
                    ))
                )}
            </div>

            <div className="mt-8">
                {paginatedData.length ? (
                    <Pagination
                        currentPage={currentPage}
                        nextPage={nextPage}
                        prevPage={prevPage}
                        totalPages={totalPages}
                    />
                ) : null}
            </div>
        </div>
    )
}

export default Products
