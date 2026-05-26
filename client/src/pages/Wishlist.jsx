import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout.jsx";

import CropCard from "../components/CropCard.jsx";

import { getWishlist } from "../services/userService.js";

import toast from "react-hot-toast";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();

        setWishlist(data.wishlist);

      } catch (error) {
        console.error(error);
        toast.error("Failed to load wishlist");

      }
    };

    fetchWishlist();
  }, []);

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold mb-8">My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <div className="text-gray-500 text-lg">No wishlist items yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((crop) => (
            <CropCard
              key={crop._id}
              crop={crop}
              onWishlistRemove={(id) =>
                setWishlist((prev) => prev.filter((item) => item._id !== id))
              }
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default Wishlist;
