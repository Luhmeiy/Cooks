// packages
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "@phosphor-icons/react";

// styles
import { RecipeContainerTitle, StyledRecipes } from "@/styles/Recipes.styled";
import {
	IngredientsContainer,
	NewIngredientButton,
} from "@/styles/Ingredient.styled";

// Redux
import {
	selectAuthLoading,
	selectCurrentUser,
} from "@/features/auth/authSlice";
import Ingredient from "@/components/Ingredient";
import NewIngredientForm from "@/components/NewIngredientForm";

const IngredientsList = () => {
	const navigate = useNavigate();
	const user = useSelector(selectCurrentUser);
	const isLoading = useSelector(selectAuthLoading);

	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!isLoading && !user) {
			navigate("/");
		}
	}, [isLoading, user, navigate]);

	return (
		<StyledRecipes>
			<RecipeContainerTitle>
				<h2>Available Ingredients</h2>

				<NewIngredientButton onClick={() => setOpen(true)}>
					Add New Ingredient <Plus size={20} weight="light" />
				</NewIngredientButton>

				<NewIngredientForm open={open} setOpen={setOpen} />
			</RecipeContainerTitle>

			<IngredientsContainer>
				{user?.ingredientList.length ? (
					user.ingredientList.map((ingredient) => (
						<Ingredient
							ingredientProps={ingredient}
							key={ingredient._id}
						/>
					))
				) : (
					<p>No ingredients available.</p>
				)}
			</IngredientsContainer>
		</StyledRecipes>
	);
};

export default IngredientsList;
