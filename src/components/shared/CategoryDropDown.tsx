import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

// --components--
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// --rtk--
import { useGetAllCategoriesQuery } from "@/store/services/product"

export function CategoryDropDown() {
    let [searchParams, setSearchParams] = useSearchParams()
    const { data: categories, isLoading } = useGetAllCategoriesQuery()

    const category_param = searchParams.get("category")
    const [selectValue, setSelectValue] = useState<string>("")

    useEffect(() => {
        // Update the internal state if the URL query param 'category_param' changes
        if (category_param !== selectValue) {
            setSelectValue(category_param ?? "")
        }
    }, [category_param])

    return (
        <Select
            value={selectValue}
            onValueChange={(value) => {
                setSelectValue(value)
                setSearchParams({ category: value })
            }}
        >
            <SelectTrigger id="categoryDropDown">
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                {isLoading
                    ? "Getting categories..."
                    : categories?.map((category, idx) => (
                          <SelectItem
                              key={`${category}_${idx}`}
                              value={`${category}`}
                          >
                              {category}
                          </SelectItem>
                      ))}
            </SelectContent>
        </Select>
    )
}
