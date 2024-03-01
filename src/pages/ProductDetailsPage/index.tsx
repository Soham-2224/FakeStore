import BackArrowBtn from "@/components/shared/BackArrowBtn"
import StarRating from "@/components/shared/StarRating"
import { Button } from "@/components/ui/button"
import { addToCart } from "@/store/features/cartSlice"
import { useGetProductDetailsQuery } from "@/store/services/product"
import { ShoppingCartIcon } from "lucide-react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

const ProductDetailsPage = () => {
    let { productId } = useParams()

    const dispatch = useDispatch()
    
    const { data, isLoading } = useGetProductDetailsQuery(productId ?? "")

    const handleAddToCart = () => {

        if (!data) return

        dispatch(addToCart({ ...data, quantity: 1 }))
        toast.success("Item added to your cart!")
    }


    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <section className=" py-8">
            <BackArrowBtn />
            <div className="grid grid-cols-3 place-items-center gap-10 mt-6">
                <div className="p-10 border grid place-content-center rounded-xl">
                    <img
                        src={data?.image}
                        alt={data?.title}
                        className=" aspect-square object-contain"
                    />
                </div>
                <div className=" col-span-2">
                    <h2 className=" text-h2 font-semibold">{data?.title}</h2>
                    <p className=" text-lg text-secondary-foreground mt-2">{data?.description}</p>
                    <div className="flex justify-between items-center mt-4">
                        <div>
                            <StarRating />
                            <h2 className="text-h2 font-bold mt-8">
                                {" "}
                                <small className="font-normal text-destructive mr-2">-17%</small> ₹{data?.price}
                            </h2>
                            <small className=" block mt-2 line-through text-small text-muted-foreground ">
                                ₹{Number(data?.price) + 500}
                            </small>
                        </div>
                        <div className=" text-md font-semibold px-6 py-3 rounded-full bg-secondary w-fit">
                            {data?.category}
                        </div>
                    </div>
                    <Button onClick={handleAddToCart} className=" w-full gap-2 mt-8">
                        <ShoppingCartIcon size={20} />
                        Add to cart
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default ProductDetailsPage
