import { z } from "zod"

export const loginSchema = z.object({
    username: z.string().min(2, { message: "Must contain at least 2 characters" }).max(50, {message: "Must be less than 50 characters"}),
    password: z.string().min(4, { message: "Must contain at least 4 characters" }).max(8)
})

export const profileSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    username: z
        .string()
        .min(2, { message: "Must contain at least 2 characters" })
        .max(50, { message: "Must be less than 50 characters" }),
    password: z
        .string()
        .min(4, { message: "Must contain at least 4 characters" })
        .max(8, { message: "Must be less than 9 characters" }),
    name: z.object({
        firstname: z.string(),
        lastname: z.string()
    }),
    address: z.object({
        city: z
            .string()
            .min(4, { message: "Must contain at least 4 characters" })
            .max(50, { message: "Must be less than 50 characters" }),
        street: z
            .string()
            .min(4, { message: "Must contain at least 4 characters" })
            .max(50, { message: "Must be less than 50 characters" }),
        zipcode: z.string(),
        number: z.number(),
        geolocation: z.object({
            lat: z.string(),
            long: z.string()
        })
    }),
    phone: z.string().min(10)
})