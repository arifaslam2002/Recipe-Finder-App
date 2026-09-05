const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800">
          {recipe.strMeal}
        </h2>

        <p className="text-gray-500 mt-2">
          Category: {recipe.strCategory}
        </p>

        <p className="text-gray-500">
          Area: {recipe.strArea}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;