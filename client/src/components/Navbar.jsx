import { Link } from "react-router-dom";
import React from "react";
import AuthContext from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-emerald-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          FarmFusion
        </Link>

        <div className="flex items-center gap-6 text-lg">
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>

          <Link to="/marketplace" className="hover:text-yellow-300 transition">
            Marketplace
          </Link>

          {user?.user?.role === "farmer" && (
            <>
              <Link
                to="/dashboard"
                className="hover:text-yellow-300 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/create-crop"
                className="hover:text-yellow-300 transition"
              >
                Sell Crops
              </Link>
            </>
          )}

          {user?.user?.role === "buyer" && (
            <Link
              to="/buyer-orders"
              className="hover:text-yellow-300 transition"
            >
              My Orders
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-medium">Welcome, {user.user.name}</span>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-yellow-300 transition">
              Login
            </Link>
          )}

          {!user && (
            <Link
              to="/register"
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
            >
              Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
