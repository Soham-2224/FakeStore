// --componetns--
import { Button } from "@/components/ui/button"

// --icons--
import { ArrowLeft, ArrowRight } from "lucide-react"

type Props = {
    currentPage: number
    totalPages: number
    prevPage: () => void
    nextPage: () => void
}

const Pagination = ({ currentPage, totalPages, nextPage, prevPage }: Props) => {
    return (
        <div className="flex items-center justify-end gap-6">
            <p className=" font-medium">
                Page {currentPage} of {totalPages}
            </p>

            <div className="flex items-center">
                <Button
                    variant="ghost"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                >
                    <ArrowLeft
                        size={18}
                        className=" mr-1"
                    />
                    Previous Page
                </Button>
                <Button
                    variant="ghost"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                >
                    Next Page
                    <ArrowRight
                        size={18}
                        className=" ml-1"
                    />
                </Button>
            </div>
        </div>
    )
}

export default Pagination
