import { ProductApiArgs, productType } from "@/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://fakestoreapi.com"
    }),
    tagTypes: ["products", "categories"],
    endpoints: (builder) => ({
        getAllCategories: builder.query<string[], void>({
            query: () => ({ url: `/products/categories` }),
            providesTags: ["categories"]
        }),
        getAllProducts: builder.query<productType[], ProductApiArgs>({
            query: ({ category, sort_by = "asc" }) => ({
                url: `/products${category ? `/category/${category}` : ""}?sort=${sort_by}`
            }),
            providesTags: ["products"]
        }),
        getProductDetails: builder.query<productType, string>({
            query: (id) => ({
                url: `/products/${id}`
            })
        })
    })
})

export const { useGetAllCategoriesQuery, useGetAllProductsQuery, useGetProductDetailsQuery } = productApi
