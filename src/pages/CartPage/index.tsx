// import { useSearchParams } from "react-router-dom"

// --components--
import CartCard from "@/components/Cart/CartCard"
import BackArrowBtn from "@/components/shared/BackArrowBtn"
import Pagination from "@/components/shared/Pagination"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

// --lib--
import usePagination from "@/lib/hooks/usePagination"

// --rtk--
import { useDispatch, useSelector } from "react-redux"
import { clearCart, selectItems, selectTotal } from "@/store/features/cartSlice"

// --icons--
import { TrashIcon } from "lucide-react"

export default function CartPage() {
    // let [searchParams] = useSearchParams()

    const dispatch = useDispatch()
    const subTotal = useSelector(selectTotal)
    const cartItems = useSelector(selectItems)

    // const startDate = searchParams.get("startdate")
    // const endDate = searchParams.get("enddate")

    const { paginatedData, currentPage, nextPage, prevPage, totalPages } = usePagination(cartItems, 9)

    return (
        <section className=" py-8">
            <BackArrowBtn />
            <h3 className=" text-h3 mt-4">Price Details</h3>
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-4 mt-4">
                        <Label className=" label">Price ({cartItems.length} items):</Label>
                        <span>₹{Number(subTotal).toFixed(0)}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                        <Label className=" label">Delivery charges:</Label>
                        <span className=" text-green-500">
                            <small className=" line-through text-foreground">₹40</small> Free
                        </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                        <Label className=" label">Total Amount:</Label>
                        <h1 className=" font-semibold">₹{Number(subTotal).toFixed(0)}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <Button
                        disabled={!cartItems.length}
                        className=" text-lg px-20 py-6 bg-orange hover:bg-orange/80"
                    >
                        PLACE ORDER
                    </Button>
                    <Button
                        disabled={!cartItems.length}
                        onClick={() => dispatch(clearCart())}
                        variant="destructive"
                        className=" py-6"
                    >
                        <TrashIcon
                            size={18}
                            className=" mr-2"
                        />
                        Clear cart
                    </Button>
                </div>
            </div>
            {paginatedData.length ? (
                <div className="grid grid-cols-3 place-items-center gap-10 mt-6">
                    {paginatedData.map((item) => (
                        <CartCard
                            isBigCard
                            key={item.id}
                            data={item}
                        />
                    ))}
                </div>
            ) : (
                <h1 className=" text-center mt-20">Your cart looks empty!</h1>
            )}
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
        </section>
    )
}
