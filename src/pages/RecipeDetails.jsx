import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchRecipe = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      setRecipe(response.data.meals[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipe();
  }, [id]);
  if (loading) {
    return <h2 className="text-center mt-10 text-2xl">Loading...</h2>;
  }

  if (!recipe) {
    return <h2 className="text-center mt-10 text-red-500">Recipe not found</h2>;
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full max-h-96 object-cover rounded-2xl"
      />

      <h1 className="text-4xl font-bold mt-6">{recipe.strMeal}</h1>

      <p className="text-gray-500 mt-2">Category: {recipe.strCategory}</p>

      <p className="text-gray-500">Area: {recipe.strArea}</p>

      <h2 className="text-2xl font-bold mt-8 mb-3">Instructions</h2>

      <p className="text-gray-700 leading-7">{recipe.strInstructions}</p>
    </div>
  );
};

export default RecipeDetails;
