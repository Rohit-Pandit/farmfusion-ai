import AuthContext from "./AuthContext";
import React, { useEffect } from "react";

import { getWishlist } from "../services/userService.js";

const AuthContextProvider = ({ children }) => {
  
  const [user, setUser] = React.useState(null);

  
  const [loading, setLoading] = React.useState(true);

  
  const [wishlist, setWishlist] = React.useState([]);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data in localStorage");

        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  
  useEffect(() => {
    const fetchWishlist = async () => {
      
      if (!user || user?.user?.role !== "buyer") {
        return;
      }

      try {
        const data = await getWishlist();

        setWishlist(data.wishlist.map((item) => item._id));

        console.log("Wishlist loaded:", data.wishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [user]);

  const login = (userData) => {
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);

    setWishlist([]);

    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,

        wishlist,
        setWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
