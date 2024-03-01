import { useEffect, useState } from "react"

// --components--
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { FilterIcon } from "lucide-react"
import { useSearchParams } from "react-router-dom"

const FILTER_OPTIONS = ["asc", "desc"]

const SortFilter = () => {
    let [searchParams, setSearchParams] = useSearchParams()
    const [sortByOption, setSortByOption] = useState<string>("")

    const category_param = searchParams.get("category")
    const sort_param = searchParams.get("sort_by")

    useEffect(() => {
        // Update the internal state if the URL query param 'sort_param' changes
        if (sort_param !== sortByOption) {
            setSortByOption(sort_param ?? "")
        }
    }, [sort_param])

    const onValueChange = (value: string) => {
        setSortByOption(value)

        if (category_param) {
            setSearchParams({ category: category_param, sort_by: value })
        } else {
            setSearchParams({ sort_by: value })
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                >
                    <FilterIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={sortByOption}
                    onValueChange={(value) => onValueChange(value)}
                >
                    {FILTER_OPTIONS.map((option) => (
                        <DropdownMenuRadioItem
                            key={option}
                            value={option}
                        >
                            {option}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SortFilter
