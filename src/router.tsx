
// --routing--
import { createBrowserRouter } from 'react-router-dom'

// --components--
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import ProfilePage from '@/pages/ProfilePage'

// --pages--
import NotFound from '@/pages/not-found-page'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <NotFound />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/profile/:userId",
        element: <ProfilePage />
    },
])
