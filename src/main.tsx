import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

// --routing--
import { BrowserRouter } from "react-router-dom"

// --styles--
import "./index.css"

// --rtk--
import { store } from "@/store"
import { Provider } from "react-redux"

// --components--
import { Toaster } from "@/components/ui/sonner"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
                <Toaster
                    position="top-center"
                    richColors
                />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
)
