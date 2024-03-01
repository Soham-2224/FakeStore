import { configureStore } from "@reduxjs/toolkit"

// --services--
import { userApi } from "./services/user"
import { productApi } from "./services/product"
import cartReducer from "./features/cartSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [userApi.reducerPath]: userApi.reducer,
        [productApi.reducerPath]: productApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(productApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
