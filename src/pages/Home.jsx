import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect,useState } from "react";
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
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Discover Delicious Recipes 🍽️
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-bold">{recipe.strMeal}</h2>

                <p className="text-gray-500 mt-2">{recipe.strCategory}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
