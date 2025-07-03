"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => setRecipe(res.data.meals[0]));
    }
  }, [id]);

  const addToFavorites = async () => {
    if (!recipe) return;

    await axios.post("/api/favorites", {
      recipeId: recipe.idMeal,
      recipeName: recipe.strMeal,
      imageUrl: recipe.strMealThumb,
    });

    alert("Added to favorites!");
  };

  if (!recipe) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="rounded w-full mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <p className="mb-4">{recipe.strInstructions}</p>
      <button
        onClick={addToFavorites}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Favorites
      </button>
    </div>
  );
}
