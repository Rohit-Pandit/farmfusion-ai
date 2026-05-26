import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { createCrop } from "../services/cropService.js";

import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


const CreateCrop = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    location: "",
  });

  const [image, setImage] = useState(null);

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
      setLoading(true);
      const cropData = new FormData();

      
      Object.keys(formData).forEach((key) => {
        cropData.append(key, formData[key]);
      });

      
      cropData.append("image", image);

      const data = await createCrop(cropData);

      setFormData({
        title: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        location: "",
      });
      setImage(null);


      console.log(data);

      toast.success("Crop created successfully");

        navigate("/marketplace");
    } catch (error) {
      console.error(error);

      toast.error("Failed to create crop");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">

        <h2 className="text-3xl font-bold mb-6">
          Create Crop Listing 🌾
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
            value={formData.title}
            required
            placeholder="Crop Title"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <textarea
            name="description"
            value={formData.description}
            required
            placeholder="Description"
            className="w-full border p-3 rounded-lg"
            rows="4"
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            required
            placeholder="Price (₹ per kg)"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            required
            placeholder="Quantity (kg)"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            required
            placeholder="Category"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            required
            placeholder="Location"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          
          <input
            type="file"
            key={image ? image.name : ""}
            accept="image/*"
            className="w-full"
            onChange={handleImageChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 text-white py-3 rounded-lg hover:bg-emerald-800 transition"
          >
            {loading ? "Creating Crop..." : "Create Crop"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default CreateCrop;