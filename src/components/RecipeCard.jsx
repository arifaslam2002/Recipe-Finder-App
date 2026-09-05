import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800">{recipe.strMeal}</h2>

        <p className="text-gray-500 mt-2">
          Category: {recipe.strCategory || "N/A"}
        </p>

        <p className="text-gray-500">Area: {recipe.strArea || "N/A"}</p>

        <button
          onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
          className="mt-4 bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
