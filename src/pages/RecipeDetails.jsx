import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );

      if (!response.data.meals) {
        setError("Recipe not found");
        return;
      }

      setRecipe(response.data.meals[0]);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch recipe");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <h2 className="text-center mt-10 text-2xl font-bold">Loading... 🍳</h2>
    );
  }

  if (error || !recipe) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl text-red-500 font-bold">
          {error || "Recipe not found"}
        </h2>

        <button
          onClick={() => navigate("/")}
          className="mt-5 bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // Get ingredients
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient,
        measure,
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-5 bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700"
      >
        ← Back
      </button>

      {/* Recipe Image */}
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full max-h-96 object-cover rounded-2xl shadow-lg"
      />

      {/* Recipe Name */}
      <h1 className="text-4xl font-bold mt-6 text-gray-800">
        {recipe.strMeal}
      </h1>

      {/* Category */}
      <p className="text-gray-500 mt-3">
        Category: <span className="font-semibold">{recipe.strCategory}</span>
      </p>

      {/* Area */}
      <p className="text-gray-500">
        Area: <span className="font-semibold">{recipe.strArea}</span>
      </p>

      {/* Ingredients */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Ingredients 🥕</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ingredients.map((item, index) => (
          <div
            key={index}
            className="bg-orange-50 p-3 rounded-lg flex justify-between"
          >
            <span className="font-semibold">{item.ingredient}</span>

            <span className="text-gray-600">{item.measure}</span>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <h2 className="text-2xl font-bold mt-8 mb-3">Instructions 📖</h2>

      <p className="text-gray-700 leading-7 whitespace-pre-line">
        {recipe.strInstructions}
      </p>
    </div>
  );
};

export default RecipeDetails;
