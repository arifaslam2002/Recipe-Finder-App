import { useState } from "react";
import axios from "axios";
const SearchBar = ({ setRecipes }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      return;
    }
    try {
      setLoading("true");
      setError("");
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`,
      );
      if (!response.data.meals) {
        setError("No recipes found");
        setRecipes([]);
        return;
      }
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.log(error);
      setError("Failed to search recipes");
    } finally {
      setLoading(false);
    }
  };
  const handleCategory = async (e) => {
    const selectedCategory = e.target.value;

    setCategory(selectedCategory);

    if (!selectedCategory) {
      return;
    }

    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`,
      );

      setRecipes(response.data.meals || []);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-3 max-w-2xl mx-auto mb-8"
      >
        <input
          type="text"
          placeholder="Search for recipe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400"
        />
        <select
          value={category}
          onChange={handleCategory}
          className="border border-gray-300 rounded-xl p-3 outline-none"
        >
          <option value="">All Categories</option>
          <option value="Beef">Beef</option>
          <option value="Chicken">Chicken</option>
          <option value="Dessert">Dessert</option>
          <option value="Pasta">Pasta</option>
          <option value="Seafood">Seafood</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Breakfast">Breakfast</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold disabled:bg-gray-400"
        >
          {loading ? "Searching..." : "Search 🔎"}
        </button>
      </form>
      {error && <p className="text-center text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default SearchBar;
