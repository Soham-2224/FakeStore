// --types--
import { productType } from "@/types"

// --components--
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

// --rtk--
import { useDispatch } from "react-redux"
import { removeFromCart, updateItemQuantity } from "@/store/features/cartSlice"

// --icons--
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const CartCard = ({ data, isBigCard }: { data: productType & { quantity: number }, isBigCard?: boolean }) => {
    const dispatch = useDispatch()

    const handleIncreaseQuantity = () => {
        dispatch(updateItemQuantity({ id: data.id, quantity: data.quantity + 1 }))
    }

    const handleDecreaseQuantity = () => {
        dispatch(updateItemQuantity({ id: data.id, quantity: Math.max(0, data.quantity - 1) }))
    }

    const handleItemDelete = () => {
        dispatch(removeFromCart(data?.id))
        toast.warning("Item removed from cart!")
    }

    return (
        <Card className=" grid grid-cols-3 gap-4 place-content-center p-2">
            <img
                src={data.image}
                alt={data.title}
                className=" w-full aspect-square object-contain"
            />
            <div className={cn(" col-span-2", isBigCard && " flex flex-col justify-between")}>
                <div>
                    <h2 className=" text-base font-semibold line-clamp-1">{data?.title}</h2>
                    {isBigCard ? <h2 className=" text-xs font-normal line-clamp-1">{data?.description}</h2> : null}
                    <h2 className="text-lg font-bold ">₹{Number(data?.price).toFixed(2)}</h2>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={handleDecreaseQuantity}
                            variant="outline"
                            size="icon"
                        >
                            <MinusIcon size={18} />
                        </Button>
                        <small>{data?.quantity}</small>
                        <Button
                            onClick={handleIncreaseQuantity}
                            variant="outline"
                            size="icon"
                        >
                            <PlusIcon size={18} />
                        </Button>
                    </div>
                    <Button
                        onClick={handleItemDelete}
                        variant="secondary"
                        size="icon"
                    >
                        <TrashIcon size={18} />
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default CartCard
