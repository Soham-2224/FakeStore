import { Link } from "react-router-dom"

// --shadcn--
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// --components--
import CartBtn from "./CartBtn"

// --lib--
import { useLocalStorage } from "@/lib/hooks/useLocalStorage"

export default function Header() {
    const { getItem } = useLocalStorage("isLoggedIn")
    const isUserLoggedIn = getItem()

    return (
        <header className="py-3 border-b | zIndex__header ">
            <div className="flex justify-between items-center mx-auto | max-section-width section-padding">
                <h1 className=" text-2xl font-bold text-primary">FakeStore</h1>

                {isUserLoggedIn ? (
                    <div className="flex items-center gap-4">
                        <CartBtn />

                        <Link to="/profile/2">
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </Link>
                    </div>
                ) : null}
            </div>
        </header>
    )
}
