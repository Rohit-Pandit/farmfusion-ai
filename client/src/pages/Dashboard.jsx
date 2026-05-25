import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout.jsx";

import DashboardCropCard from "../components/DashboardCropCard.jsx";

import { getMyCrops, deleteCrop } from "../services/cropService.js";

import { toast } from "react-hot-toast";

const Dashboard = () => {
  const [crops, setCrops] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCrops = async () => {
      try {
        const data = await getMyCrops();

        setCrops(data.crops);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCrops();
  }, []);

  const handleDelete = async (id) => {
    // Confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this crop?",
    );

    if (!confirmDelete) return;

    try {
      await deleteCrop(id);

      // Remove from UI instantly
      setCrops((prevCrops) => prevCrops.filter((crop) => crop._id !== id));

      toast.success("Crop deleted successfully");
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete crop");
    }
  };

  return (
    <MainLayout>
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Farmer Dashboard 🚜</h1>

        <p className="text-gray-600 mt-2">Manage your crop listings.</p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center text-xl">Loading...</div>
      ) : crops.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No crops added yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops.map((crop) => (
            <DashboardCropCard key={crop._id} crop={crop} onDelete={handleDelete}/>
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default Dashboard;
