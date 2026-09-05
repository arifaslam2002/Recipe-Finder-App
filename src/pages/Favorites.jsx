import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import Navbar from "../components/Navbar";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(
      (recipe) => recipe.idMeal !== id
    );

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );

    setFavorites(updatedFavorites);
  };

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          My Favorite Recipes ❤️
        </h1>

        {favorites.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">
            No favorite recipes yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((recipe) => (
              <div key={recipe.idMeal} className="relative">
                <RecipeCard recipe={recipe} />

                <button
                  onClick={() => removeFavorite(recipe.idMeal)}
                  className="absolute top-3 right-3 bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-600"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;