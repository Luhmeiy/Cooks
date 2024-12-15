import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { StyledSearch } from "./Search.styled";
import RecipesContainer from "@/components/RecipesContainer";
import { Recipe } from "@/interfaces/Recipe";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import {
	useGetPublicRecipesQuery,
	useGetUserRecipesQuery,
} from "@/features/recipes/recipesApiSlice";

const Search = () => {
	const { search } = useParams();
	const loweredSearch = search!.toLowerCase();

	const userId = useSelector(selectCurrentUserId);

	const { data: communityData, isLoading: isLoadingCommunityData } =
		useGetPublicRecipesQuery(null);
	const { data: userData, isLoading: isLoadingUserData } =
		useGetUserRecipesQuery(userId!);

	if (isLoadingCommunityData || isLoadingUserData) return <p>Loading...</p>;

	const filterRecipes = (data: { recipes: Recipe[] } | undefined) => {
		return (
			data?.recipes.filter(
				({ name, category, ingredients }) =>
					name.toLowerCase().includes(loweredSearch) ||
					category.toLowerCase().includes(loweredSearch) ||
					ingredients.some(({ ingredient }) =>
						ingredient.toLowerCase().includes(loweredSearch)
					)
			) || []
		);
	};

	const communityRecipes = filterRecipes(communityData);
	const userRecipes = filterRecipes(userData);

	return (
		<StyledSearch>
			<h2>Search Results</h2>

			<RecipesContainer recipes={communityRecipes}>
				<h3>Community Recipes</h3>
			</RecipesContainer>

			<RecipesContainer recipes={userRecipes}>
				<h3>Your Recipes</h3>
			</RecipesContainer>
		</StyledSearch>
	);
};

export default Search;