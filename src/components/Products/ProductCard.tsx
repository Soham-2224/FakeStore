import { Link } from 'react-router-dom'

// --components--
import { Button } from '@/components/ui/button'

// --types--
import { productType } from '@/types'

// --icons--
import { ShoppingCartIcon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/store/features/cartSlice'
import { toast } from 'sonner'

const ProductCard = ({data}: {data: productType}) => {

  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({ ...data, quantity: 1 }))
    toast.success("Item added to your cart!")
  }

  return (
      <div className="relative flex w-full  flex-col overflow-hidden rounded-lg border bg-primary-foreground shadow-md">
          <Link
              className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
              to={`/product/${data.id}`}
          >
              <img
                  className="object-contain mx-auto"
                  src={data?.image}
                  alt="product image"
              />
          </Link>
          <div className="mt-4 px-5 pb-5">
              <Link to={`/product/${data.id}`}>
                  <h5 className="text-xl font-semibold tracking-tight line-clamp-1">{data.title}</h5>
              </Link>
              <p className="text-sm font-normal text-secondary-foreground line-clamp-2 mt-2">{data.description}</p>
              <div className="mt-2 mb-5 flex items-center justify-between">
                  <span className=" text-sm font-semibold px-4 py-2 rounded-full bg-secondary">{data.category}</span>
                  <p className="text-3xl font-bold">₹{data.price}</p>
              </div>
              <Button onClick={handleAddToCart} className=" w-full gap-2">
                  <ShoppingCartIcon size={20} />
                  Add to cart
              </Button>
          </div>
      </div>
  )
}

export default ProductCard