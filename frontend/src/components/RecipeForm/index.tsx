// packages
import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "@phosphor-icons/react";

// styles
import { InputContainer } from "@/styles/Form.styled";
import {
	InformationContainer,
	IngredientsContainer,
	IngredientsForm,
	PublicContainer,
	StyledRecipeForm,
} from "./RecipeForm.styled";

// components / interfaces / Redux
import Button from "@/components/Button";
import { Recipe } from "@/interfaces/Recipe";
import {
	selectAuthLoading,
	selectCurrentUser,
} from "@/features/auth/authSlice";
import { PostRecipeType } from "@/features/recipes/recipesApiSlice";

const defaultIngredient = {
	ingredient: "",
	quantity: 1,
	unit: "",
};

const RecipeForm = ({
	submitRecipe,
	isLoadingSubmit,
	recipe,
}: {
	submitRecipe: PostRecipeType;
	isLoadingSubmit: boolean;
	recipe?: Recipe;
}) => {
	const navigate = useNavigate();
	const user = useSelector(selectCurrentUser);
	const isLoading = useSelector(selectAuthLoading);

	const [title, setTitle] = useState(recipe?.name || "");
	const [prepTime, setPrepTime] = useState(recipe?.prepTime || "");
	const [servings, setServings] = useState(recipe?.servings || 1);
	const [category, setCategory] = useState(recipe?.category || "");
	const [instructions, setInstructions] = useState(
		recipe?.instructions || ""
	);
	const [description, setDescription] = useState(recipe?.description || "");
	const [isPublic, setIsPublic] = useState(recipe?.public || false);
	const [ingredients, setIngredients] = useState(
		recipe?.ingredients || [defaultIngredient]
	);

	const addNewIngredient = () => {
		setIngredients([...ingredients, defaultIngredient]);
	};

	const updateIngredients = (
		field: string,
		index: number,
		value: string | number
	) => {
		const updatedIngredients = ingredients.map((ingredient, i) =>
			i === index ? { ...ingredient, [field]: value } : ingredient
		);

		setIngredients(updatedIngredients);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!user) return;

		const newRecipe = {
			name: title,
			prepTime,
			servings,
			category,
			description,
			ingredients,
			instructions,
			favorite: false,
			public: isPublic,
			userId: user._id,
			createdBy: {
				_id: recipe?.createdBy._id || user?._id,
				username: recipe?.createdBy.username || user?.username,
			},
		};

		const { error } = await submitRecipe({
			id: recipe?._id || "",
			data: { data: newRecipe },
		});

		if (!error) {
			const redirectLink = recipe ? `/recipe/${recipe?._id}` : "/";
			navigate(redirectLink);
		}
	};

	useEffect(() => {
		if ((!isLoading && !user) || (recipe && recipe?.userId !== user?._id)) {
			navigate("/");
		}
	}, [isLoading, user, navigate, recipe]);

	return (
		<StyledRecipeForm onSubmit={handleSubmit}>
			<div>
				<h2>Recipe Information</h2>

				<InformationContainer>
					<div>
						<InputContainer>
							Title
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Ex.: Apple Pie"
								required
							/>
						</InputContainer>

						<InputContainer>
							Preparation Time
							<input
								type="text"
								value={prepTime}
								onChange={(e) => setPrepTime(e.target.value)}
								placeholder="Ex.: 2 hours"
								required
							/>
						</InputContainer>
					</div>

					<div>
						<InputContainer>
							<div>
								Servings <span>(Optional)</span>
							</div>
							<input
								type="number"
								min={1}
								value={servings}
								onChange={(e) => setServings(+e.target.value)}
							/>
						</InputContainer>

						<InputContainer>
							<div>
								Category <span>(Optional)</span>
							</div>
							<input
								type="text"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								placeholder="Ex.: Dessert"
							/>
						</InputContainer>
					</div>
				</InformationContainer>

				<InformationContainer>
					<InputContainer>
						Instructions
						<textarea
							value={instructions}
							onChange={(e) => setInstructions(e.target.value)}
							placeholder={`Ex.:\nPrepare the apple pie.\nEat the apple pie.`}
							required
						/>
					</InputContainer>

					<InputContainer>
						<div>
							Description <span>(Optional)</span>
						</div>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Ex.: Delicious pie."
						/>
					</InputContainer>
				</InformationContainer>
			</div>

			<div>
				<b>Do you want this recipe to be public?</b>

				<PublicContainer>
					<label>
						<input
							type="radio"
							name="public"
							value="true"
							checked={isPublic === true}
							onChange={() => setIsPublic(true)}
						/>
						Yes
					</label>

					<label>
						<input
							type="radio"
							name="public"
							value="false"
							checked={isPublic === false}
							onChange={() => setIsPublic(false)}
						/>
						No
					</label>
				</PublicContainer>
			</div>

			<div>
				<h2>Ingredients</h2>

				<IngredientsForm>
					<IngredientsContainer>
						{ingredients.map((ingredient, index) => (
							<div key={index}>
								<InputContainer>
									Ingredient
									<input
										type="text"
										value={ingredient.ingredient}
										onChange={(e) =>
											updateIngredients(
												"ingredient",
												index,
												e.target.value
											)
										}
										placeholder="Ex.: Apple"
										required
									/>
								</InputContainer>

								<InputContainer>
									Quantity
									<input
										type="number"
										value={ingredient.quantity}
										onChange={(e) =>
											updateIngredients(
												"quantity",
												index,
												e.target.value
											)
										}
										min={1}
										required
									/>
								</InputContainer>

								<InputContainer>
									Unit
									<input
										type="text"
										value={ingredient.unit}
										onChange={(e) =>
											updateIngredients(
												"unit",
												index,
												e.target.value
											)
										}
										placeholder="Ex.: Whole"
										required
									/>
								</InputContainer>
							</div>
						))}
					</IngredientsContainer>

					<Button
						type="button"
						$variant="gray"
						onClick={addNewIngredient}
					>
						Add New Ingredient <Plus />
					</Button>
				</IngredientsForm>
			</div>

			<div>
				<Button disabled={isLoadingSubmit}>Save Recipe</Button>
			</div>
		</StyledRecipeForm>
	);
};

export default RecipeForm;
