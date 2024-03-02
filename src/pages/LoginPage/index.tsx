import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

// --components--
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

// --schema--
import { loginSchema } from "@/lib/validations/loginSchema"

// --third-party--
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

// --rtk--
import { useLoginUserMutation } from "@/store/services/user"

// --lib--
import { useLocalStorage } from "@/lib/hooks/useLocalStorage"

export default function LoginPage() {
    const [loginUser, { isLoading, isError, isSuccess, data }] = useLoginUserMutation()
    const { setItem } = useLocalStorage("isLoggedIn")
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error("Error loggin in")
        }

        if (isSuccess) {
            console.log(data)
            setItem(true)
            navigate("/")
        }
    }, [isSuccess, isError])

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "johnd",
            password: "m38rmF$"
        }
    })

    function onSubmit(values: z.infer<typeof loginSchema>) {
        loginUser(values)
    }
    
    return (
        <div className=" max-w-96 mx-auto mt-32">
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="john doe"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="enter your password"
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                disabled={isLoading}
                                className=" w-full mt-5"
                                type="submit"
                            >
                                {isLoading ? "Loging in..." : "Login"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
