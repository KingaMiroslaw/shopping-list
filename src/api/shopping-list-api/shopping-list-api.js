import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ShoppingListApi = createApi({
  reducerPath: "shoppingListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shopping-list-7fbb0-default-rtdb.firebaseio.com",
  }),
  endpoints: (builder) => ({
    getListItems: builder.query({
      query: () => "/products.json",
      transformResponse: (response) => {
        const array = [];

        if (response !== null) {
          for (const key in response) {
            array.push({
              id: key,
              productName: response[key].productName,
              amount: response[key].amount,
            });
          }
        }
        return array;
      },
    }),
    addListItem: builder.mutation({
      query: (body) => ({
        url: "/products.json",
        method: "POST",
        body,
      }),
    }),
    removeListItem: builder.mutation({
      query: (id) => ({
        url: `/products/${id}.json`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetListItemsQuery,
  useAddListItemMutation,
  useRemoveListItemMutation,
} = ShoppingListApi;
