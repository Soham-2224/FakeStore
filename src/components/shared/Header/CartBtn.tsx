import { Link } from "react-router-dom"

// --components--
import CartCard from "@/components/Cart/CartCard"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"

// --rtk-
import { useDispatch, useSelector } from "react-redux"
import { clearCart, selectItems, selectTotal } from "@/store/features/cartSlice"

// --icons--
import { ShoppingCartIcon, TrashIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const CartBtn = () => {

    const dispatch = useDispatch()
    const subTotal = useSelector(selectTotal)
    const cartItems = useSelector(selectItems)

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className=" relative">
                    <span
                        className={cn(
                            " scale-0 absolute -top-1 -right-1 w-5 h-5 grid place-content-center rounded-full bg-red-600 text-white transition-transform duration-200 ease-in",
                            cartItems.length && " scale-100"
                        )}
                    >
                        {cartItems.length}
                    </span>
                    <ShoppingCartIcon className="mr-2 h-4 w-4" /> My cart
                </Button>
            </SheetTrigger>
            <SheetContent className=" h-full flex flex-col">
                <SheetHeader>
                    <SheetTitle>Subtotal: ₹{Number(subTotal).toFixed(2)}</SheetTitle>
                    <SheetDescription>Go to cart page to see details</SheetDescription>
                </SheetHeader>
                <ScrollArea className=" flex-1 py-4">
                    <div className="flex flex-col gap-4">
                        {cartItems.length ? (
                            cartItems.map((item) =>
                                    <CartCard
                                        key={item.id}
                                        data={item}
                                    />
                            )
                        ) : (
                            <h1>Your cart looks empty!</h1>
                        )}
                    </div>
                </ScrollArea>
                <SheetFooter className="grid grid-cols-2 gap-4">
                    <Button
                        onClick={() => dispatch(clearCart())}
                        variant="destructive"
                        className="flex-1"
                    >
                        <TrashIcon
                            size={18}
                            className=" mr-2"
                        />
                        Clear cart
                    </Button>
                    <SheetClose asChild>
                        <Link
                            className="flex-1"
                            to="/cart"
                        >
                            <Button className=" w-full">
                                <ShoppingCartIcon
                                    size={18}
                                    className=" mr-2"
                                />
                                Go to cart
                            </Button>
                        </Link>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default CartBtn
