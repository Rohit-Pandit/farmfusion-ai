import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";

import { getSingleCrop, updateCrop } from "../services/cropService.js";


const EditCrop = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    location: "",
  });


  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const data = await getSingleCrop(id);

        setFormData({
          title: data.crop.title,
          description: data.crop.description,
          price: data.crop.price,
          quantity: data.crop.quantity,
          category: data.crop.category,
          location: data.crop.location,
        });
      } catch (error) {
        console.error(error);

        toast.error("Failed to load crop");
      } finally {
        setLoading(false);
      }
    };

    fetchCrop();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cropData = new FormData();

      Object.keys(formData).forEach((key) => {
        cropData.append(key, formData[key]);
      });

      if (image) {
        cropData.append("image", image);
      }

      await updateCrop(id, cropData);

      toast.success("Crop updated successfully");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error("Failed to update crop");
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6">Edit Crop ✏️</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input type="file" accept="image/*" onChange={handleImageChange} />

          <button
            type="submit"
            className="w-full bg-emerald-700 text-white py-3 rounded-lg hover:bg-emerald-800 transition"
          >
            Update Crop
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default EditCrop;
