import { z } from "zod"

export const productSchema = z.object({
    id: z.number(),
    title: z.string(),
    price: z.string(),
    category: z.string(),
    description: z.string(),
    image: z.string()
})

export type productType = z.infer<typeof productSchema>

export type ProductApiArgs = {
    category: string | null
    sort_by: "asc" | "desc"
}

export type CartApiArgs = {
    startDate: string | null
    endDate: string | null
    sort_by: "asc" | "desc"
}

export type UserDetails = {
    id: number
    email: string
    username: string
    password: string
    name: Name
    address: Address
    phone: string
}

export type Name = {
    firstname: string
    lastname: string
}

export type Address = {
    city: string
    street: string
    number: number
    zipcode: string
    geolocation: Geolocation
}

export type Geolocation = {
    lat: string
    long: string
}
