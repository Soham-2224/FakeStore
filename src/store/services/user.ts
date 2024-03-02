import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// --zod--
import { z } from "zod"
import { loginSchema } from "@/lib/validations/loginSchema"
import { UserDetails } from "@/types"

export type loginType = z.infer<typeof loginSchema>

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://fakestoreapi.com"
    }),
    tagTypes: ["user", "cart"],
    endpoints: (builder) => ({
        loginUser: builder.mutation<loginType, Partial<loginType>>({
            query: ({ ...data }) => ({
                url: "/auth/login",
                method: "POST",
                body: data
            })
        }),
        getUserDetails: builder.query<UserDetails, {id: string}>({
            query: ({ id }) => ({
                url: `/users/${id}`
            })
        })
        // fetchCart: builder.query<userCartResponse, CartApiArgs>({
        //     query: ({ startDate, endDate, sort_by = "asc" }) => ({
        //         url: `/carts/user/2${(startDate && endDate) ? `startdate=${startDate}&enddate=${endDate}` : ""}?sort=${sort_by}`
        //     }),
        //     providesTags: ["cart"]
        // })
    })
})

export const { useLoginUserMutation, useGetUserDetailsQuery} = userApi
