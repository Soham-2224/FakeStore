// --types--
import { UserDetails } from "@/types"

// --lib--
import { profileSchema } from "@/lib/validations/loginSchema"
import { cn } from "@/lib/utils"

// --third-party--
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

// --components--
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

// --rtk--
import { useUpdateUserDetailsMutation } from "@/store/services/user"
import { ScrollArea } from "@/components/ui/scroll-area"

type FormFieldProps = {
    name: any
    label: string
    placeholder: string
    inputType?: React.HTMLInputTypeAttribute | undefined
}

const EditProfileForm = ({ originalData }: { originalData?: UserDetails }) => {
    const [updateUser, { isLoading }] = useUpdateUserDetailsMutation()

    const form = useForm<UserDetails>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            id: originalData?.id,
            email: originalData?.email,
            username: originalData?.username,
            password: originalData?.password,
            name: {
                firstname: originalData?.name?.firstname,
                lastname: originalData?.name?.lastname
            },
            address: {
                number: originalData?.address?.number,
                city: originalData?.address?.city,
                street: originalData?.address?.street,
                zipcode: originalData?.address?.zipcode,
                geolocation: {
                    lat: originalData?.address?.geolocation?.lat,
                    long: originalData?.address?.geolocation?.long
                }
            },
            phone: originalData?.phone,
        }
    })

    function onSubmit(values:UserDetails ) {    
        toast.promise(updateUser(values), {
            loading: "Updating details...",
            success: () => {
                return "Details updated successfully!"
            },
            error: "Error during updating details"
        })
    }

    const renderFormField = ({ name, label, placeholder, inputType }: FormFieldProps): React.ReactNode => (
        <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn(" max-sm:col-span-2")}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            type={inputType ?? "text"}
                            required
                            placeholder={placeholder}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage className=" text-xs" />
                </FormItem>
            )}
        />
    )

    const handleReset = () => {
        form.reset()
    }

    return (
        <ScrollArea className=" max-h-[80vh]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {renderFormField({
                                name: "name.firstname",
                                label: "Firstname",
                                placeholder: "Enter your firstname"
                            })}
                            {renderFormField({
                                name: "name.lastname",
                                label: "Lastname",
                                placeholder: "Enter your lastname"
                            })}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {renderFormField({
                                name: "username",
                                label: "Username",
                                placeholder: "eg: John"
                            })}
                            {renderFormField({
                                name: "password",
                                label: "Password",
                                placeholder: "password",
                                inputType: "password"
                            })}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {renderFormField({
                                name: "email",
                                label: "Email",
                                placeholder: "Enter your email",
                                inputType: "email"
                            })}
                            {renderFormField({
                                name: "phone",
                                label: "Phone number",
                                placeholder: "eg: 9876543210"
                            })}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {renderFormField({
                                name: "address.street",
                                label: "Street",
                                placeholder: "enter your street name"
                            })}
                            {renderFormField({
                                name: "address.city",
                                label: "City",
                                placeholder: "enter your city name"
                            })}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            onClick={handleReset}
                            variant="secondary"
                            disabled={isLoading}
                            className=" w-full mt-5"
                            type="reset"
                        >
                            Reset
                        </Button>
                        <Button
                            disabled={isLoading}
                            className=" w-full mt-5"
                            type="submit"
                        >
                            {isLoading ? "Updating..." : "Update profile"}
                        </Button>
                    </div>
                </form>
            </Form>
        </ScrollArea>
    )
}

export default EditProfileForm
