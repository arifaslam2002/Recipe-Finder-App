import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-orange-500 text-white px-8 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">
        Recipe Finder 🍳
      </h1>

      <div className="flex gap-6 font-semibold">
        <Link
          to="/"
          className="hover:text-yellow-200"
        >
          Home
        </Link>

        <Link
          to="/favorites"
          className="hover:text-yellow-200"
        >
          ❤️ Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
