// --shadcn--
import { Input } from "@/components/ui/input"
import { useSearchParams } from "react-router-dom"

const SearchInput = () => {

    let [searchParams, setSearchParams] = useSearchParams()
    const search_param = searchParams.get("search") || ""
    const category = searchParams.get("category")

    const handleSearch = (value: string) => {
        if (category) {
            setSearchParams({category, search: value})
            return
        }
        setSearchParams({search: value})
    }

    return (
        <Input
            value={search_param}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name"
        />
    )
}

export default SearchInput
