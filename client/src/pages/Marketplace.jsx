import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import CropCard from "../components/CropCard";

import { getAllCrops } from "../services/cropService";

const Marketplace = () => {
  const [crops, setCrops] = useState([]);

  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const data = await getAllCrops();

        setCrops(data.crops);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  return (
    <MainLayout>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Crop Marketplace 🌾
        </h1>

        <p className="text-gray-600 mt-2">
          Discover fresh crops directly from farmers.
        </p>
      </div>

      
      {loading ? (
        <div className="text-center text-xl">
          Loading crops...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {crops.map((crop) => (
            <CropCard
              key={crop._id}
              crop={crop}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default Marketplace;