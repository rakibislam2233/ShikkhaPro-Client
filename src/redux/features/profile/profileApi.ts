import { baseApi } from "../api/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/users/profile/me",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/profile/update",
        method: "PATCH",
        body: data,
      }),
    }),
    updateProfileImage: builder.mutation({
      query: (data) => ({
        url: "/users/profile/image",
        method: "PATCH",
        body: data,
      }),
    }),
    deleteProfile: builder.mutation({
      query: () => ({
        url: "/users/profile/delete",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = profileApi;
