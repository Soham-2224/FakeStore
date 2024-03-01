import { Outlet } from "react-router-dom"

// --components--
import Header from "@/components/shared/Header"
import { ScrollArea } from "./components/ui/scroll-area"

const Layout = () => {
    return (
        <div className=" h-screen flex flex-col">
            <Header />
            <ScrollArea className=" flex-1">
                <main className="max-section-width section-padding mx-auto">
                    <Outlet />
                </main>
            </ScrollArea>
            {/* <Footer /> */}
        </div>
    )
}

export default Layout
