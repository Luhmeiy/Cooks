import { apiSlice } from "@/app/api/apiSlice";
import { logout } from "./authSlice";
import { clearUserRecipes } from "../recipes/recipesSlice";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		refresh: builder.query({
			query: () => "/auth/refresh",
			providesTags: ["User"],
		}),
		login: builder.mutation({
			query: (credentials) => ({
				url: "/auth",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		register: builder.mutation({
			query: (credentials) => ({
				url: "/auth/register",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		sendLogout: builder.mutation({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(logout());
					dispatch(clearUserRecipes());
					dispatch(apiSlice.util.resetApiState());
				} catch (err) {
					console.log(err);
				}
			},
		}),
	}),
});

export const {
	useRefreshQuery,
	useLoginMutation,
	useRegisterMutation,
	useSendLogoutMutation,
} = authApiSlice;
