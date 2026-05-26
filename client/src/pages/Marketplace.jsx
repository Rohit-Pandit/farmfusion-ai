import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import CropCard from "../components/CropCard";

import { getAllCrops } from "../services/cropService.js";

const Marketplace = () => {
  const [crops, setCrops] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const data = await getAllCrops(search, category, page);

        setCrops(data.crops);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, [search, category, page]);

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Crop Marketplace 🌾</h1>

        <p className="text-gray-600 mt-2">
          Discover fresh crops directly from farmers.
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search crops..."
          className="flex-1 border p-3 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-3 rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>

          <option value="Vegetables">Vegetables</option>

          <option value="Fruits">Fruits</option>

          <option value="Grains">Grains</option>
        </select>
      </div>
      {loading ? (
        <div className="text-center text-xl">Loading crops...</div>
      ) : crops.length === 0 ? (
        <div className="text-center text-xl">No crops found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops.map((crop) => (
            <CropCard key={crop._id} crop={crop} />
          ))}
        </div>
      )}

      <div className="flex justify-center gap-4 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="bg-emerald-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-lg font-semibold">Page {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-emerald-700 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </MainLayout>
  );
};

export default Marketplace;
