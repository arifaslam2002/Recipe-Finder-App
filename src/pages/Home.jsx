import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=",
      );

      setRecipes(response.data.meals || []);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, []);
  if (loading) {
    return (
      <>
        <Navbar />
        <h2 className="text-center text-2xl font-bold mt-10">
          Loading recipes... 🍳
        </h2>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <h2 className="text-center text-2xl text-red-500 mt-10">{error}</h2>
      </>
    );
  }
  const getRandomRecipe = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php",
      );

      setRecipes(response.data.meals || []);
    } catch (error) {
      console.log(error);
      setError("Failed to get random recipe");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Discover Delicious Recipes 🍽️
        </h1>
        <SearchBar setRecipes={setRecipes} />
        <button
          onClick={getRandomRecipe}
          className="mb-3.5 bg-purple-500 text-white px-5 py-3 rounded-xl hover:bg-purple-600"
        >
          🎲 Random Recipe
        </button>
        {recipes.length === 0 ? (
          <p className="text-center text-xl text-gray-500 mt-10">
            No recipes found 😔
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
