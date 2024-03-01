
import { Button } from "@/components/ui/button"
import { ArrowLeft,  } from "lucide-react"
import { useNavigate } from "react-router-dom"

const BackArrowBtn = () => {
    const navigate = useNavigate()

    return (
        <Button
            variant="ghost"
            onClick={() => navigate(-1)}
        >
            <ArrowLeft
                size={20}
                className=" mr-1"
            />
            Back
        </Button>
    )
}

export default BackArrowBtn
