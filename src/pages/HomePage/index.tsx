import { useNavigate, Link } from "react-router-dom"

// --lib--
import { useLocalStorage } from "@/lib/hooks/useLocalStorage"

// --shadcn--
import { Button } from "@/components/ui/button"

// --components--
import SearchInput from "@/components/shared/SearchInput"
import { CategoryDropDown } from "@/components/shared/CategoryDropDown"
import SortFilter from "@/components/shared/SortFilter"
import Products from "@/components/Products"

export default function HomePage() {
    const navigate = useNavigate()
    const { getItem } = useLocalStorage("isLoggedIn")
    const isUserLoggedIn = getItem()

    if (!isUserLoggedIn) {
        navigate("/login")
    }

    return (
        <section className=" py-8">
            <h1 className="title-bold">Discover Products</h1>
            <div className="grid grid-cols-2 sm:grid-cols-5 mt-8 gap-4 items-end">
                <div className="col-span-2 flex flex-col gap-3">
                    <label htmlFor="searchInput">
                        Search products
                    </label>
                    <SearchInput />
                </div>
                <div className="col-span-2 flex flex-col gap-3">
                    <label htmlFor="categoryDropdown">Select Category</label>
                    <CategoryDropDown />
                </div>
                <Link to="/">
                    <Button
                        className="w-full"
                        variant="secondary"
                    >
                        Reset
                    </Button>
                </Link>
            </div>
            <div className="flex justify-between items-center mt-8">
                <h1 className="title-bold">Results</h1>
                <SortFilter />
            </div>
            <Products />
        </section>
    )
}
