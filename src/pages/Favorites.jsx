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
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;