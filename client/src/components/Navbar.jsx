import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide"
        >
          FarmFusion
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6 text-lg">
          <Link
            to="/"
            className="hover:text-yellow-300 transition"
          >
            Home
          </Link>

          <Link
            to="/marketplace"
            className="hover:text-yellow-300 transition"
          >
            Marketplace
          </Link>

          <Link
            to="/login"
            className="hover:text-yellow-300 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;