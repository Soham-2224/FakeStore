import { useNavigate, useParams } from "react-router-dom"

// --rtk--
import { useGetUserDetailsQuery } from "@/store/services/user"

// --components--
import { toast } from "sonner"

// --lib--
import { useLocalStorage } from "@/lib/hooks/useLocalStorage"
import { Label } from "@/components/ui/label"
import BackArrowBtn from "@/components/shared/BackArrowBtn"
import { Button } from "@/components/ui/button"
import { EditIcon, LogOutIcon, TrashIcon } from "lucide-react"

const LabelValue = ({ label, children }: { label: string; children: React.ReactNode }) => {
    return (
        <div className="flex items-center gap-4">
            <Label className=" label">{label}:</Label>
            <h2 className=" label text-foreground">{children}</h2>
        </div>
    )
}

export default function ProfilePage() {
    const navigate = useNavigate()
    const { getItem, setItem } = useLocalStorage("isLoggedIn")
    const isUserLoggedIn = getItem()
    let { userId } = useParams()

    if (!isUserLoggedIn) {
        navigate("/login")
    }

    const { data, isLoading, isError } = useGetUserDetailsQuery({ id: userId ?? "2" })

    const handleLogout = () => {
        setItem(false)
        navigate("/login")
    }

    if (isError) return toast.error("something went wrong")

    if (isLoading) return <h1>Loading...</h1>

    return (
        <div className="my-8">
            <BackArrowBtn />
            <div className="flex items-center justify-between mt-8">
                <div className="flex items-center gap-6">
                    <img
                        className=" w-40 aspect-square rounded-full"
                        src="https://i.pravatar.cc/150?img=67" // just for fake image, not in production
                        alt={data?.username}
                    />
                    <div>
                        <h2 className=" text-h2 capitalize">
                            {data?.name?.firstname} {data?.name?.lastname}
                        </h2>
                        <h2 className=" text-h4">{data?.username}</h2>
                        <div className="mt-4 flex flex-col gap-1">
                            <LabelValue label="Email">{data?.email}</LabelValue>
                            <LabelValue label="Phone number">{data?.phone}</LabelValue>
                            <div className="flex gap-6">
                                <LabelValue label="Address">
                                    {data?.address?.street}, {data?.address?.city}
                                </LabelValue>
                                <LabelValue label="Zip code">{data?.address?.zipcode}</LabelValue>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <Button>
                        <EditIcon
                            size={18}
                            className=" mr-2"
                        />
                        Edit profile
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-end gap-4 border-t mt-10 pt-10">
                <Button
                    onClick={handleLogout}
                    variant="secondary"
                >
                    <LogOutIcon
                        size={18}
                        className=" mr-2"
                    />
                    Logout
                </Button>
                <Button variant="destructive">
                    <TrashIcon
                        size={18}
                        className=" mr-2"
                    />
                    Delete account
                </Button>
            </div>
        </div>
    )
}
