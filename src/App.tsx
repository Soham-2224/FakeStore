// --routing--
import { Routes, Route } from "react-router-dom"

// --component--
import Layout from "@/Layout"

// --pages--
import HomePage from "@/pages/HomePage"
import LoginPage from "@/pages/LoginPage"
import ProfilePage from "@/pages/ProfilePage"
import NotFound from "@/pages/not-found-page"
import ProductDetailsPage from "@/pages/ProductDetailsPage"
import CartPage from '@/pages/CartPage/index'

export default function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Layout />}
                errorElement={<NotFound />}
            >
                <Route
                    index
                    element={<HomePage />}
                />
                <Route
                    path="product/:productId"
                    element={<ProductDetailsPage />}
                />
                <Route
                    path="login"
                    element={<LoginPage />}
                />
                <Route
                    path="profile/:userId"
                    element={<ProfilePage />}
                />
                <Route
                    path="cart"
                    element={<CartPage />}
                />
            </Route>
        </Routes>
    )
}
