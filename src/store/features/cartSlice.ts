import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/store"
import { productType } from "@/types"

type CartState = {
    items: Record<number, productType & { quantity: number }>
    total: number
}

const initialState: CartState = {
    items: {},
    total: 0
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Add item to cart with quantity
        addToCart: (state, action: PayloadAction<productType & { quantity: number }>) => {
            const { id, quantity, ...productInfo } = action.payload

            if (state.items[id]) {
                state.items[id].quantity += quantity
            } else {
                state.items[id] = { ...productInfo, quantity, id }
            }

            state.total += quantity * parseFloat(productInfo.price)
        },

        // Remove item from cart
        removeFromCart: (state, action: PayloadAction<number>) => {
            const itemId = action.payload
            if (state.items[itemId]) {
                const removedItem = state.items[itemId]
                delete state.items[itemId]
                state.total -= removedItem.quantity * parseFloat(removedItem.price)
            }
        },

        // Update item quantity
        updateItemQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const { id, quantity } = action.payload
            const item = state.items[id]

            if (item) {
                const newQuantity = Math.max(0, quantity)
                const quantityDiff = newQuantity - item.quantity
                const previousQuantity = item.quantity

                if (newQuantity === 0) {
                    delete state.items[id]
                    state.total -= previousQuantity * parseFloat(item.price)
                } else {
                    item.quantity = newQuantity
                    state.total += parseFloat(item.price) * quantityDiff
                }
            }
        },

        // Clear the entire cart
        clearCart: (state) => {
            state.items = {}
            state.total = 0
        }
    }
})


export const { addToCart, removeFromCart, updateItemQuantity, clearCart } = cartSlice.actions


export const selectTotal = (state: RootState) => state.cart.total
export const selectItems = (state: RootState) => Object.values(state.cart.items)

export default cartSlice.reducer
