import { Link } from "react-router-dom"

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
                <Link to="/">
                    <h1 className=" text-2xl font-bold text-primary">FakeStore</h1>
                </Link>

                {isUserLoggedIn ? (
                    <div className="flex items-center gap-4">
                        <CartBtn />

                        <Link to="/profile/2">
                            <div className=" w-10 aspect-square rounded-full overflow-hidden">
                                <img
                                    className=" object-cover"
                                    src="https://i.pravatar.cc/150?img=67"
                                    alt="profile image"
                                />
                            </div>
                        </Link>
                    </div>
                ) : null}
            </div>
        </header>
    )
}
