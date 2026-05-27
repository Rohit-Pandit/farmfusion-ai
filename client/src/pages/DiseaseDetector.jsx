import { useState } from "react";

import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout.jsx";

import { predictDisease } from "../services/aiService.js";

const DiseaseDetector = () => {
  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  
  const handlePredict = async () => {
    if (!image) {
      toast.error("Please upload image");

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("image", image);

      const data = await predictDisease(formData);

      setResult(data.prediction);

      toast.success("Disease detected");
    } catch (error) {
      console.error(error);

      toast.error("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-4xl font-bold text-center mb-8">
          AI Disease Detector 🌿
        </h1>

        
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-6"
          />

          
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-80 object-cover rounded-xl mb-6"
            />
          )}

          
          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl transition"
          >
            {loading ? "Detecting..." : "Detect Disease"}
          </button>

          
          {result && (
            <div className="mt-8 bg-gray-100 p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Prediction Result</h2>

              <p className="mb-3">
                <span className="font-semibold">Disease:</span> {result.disease}
              </p>

              <p className="mb-3">
                <span className="font-semibold">Confidence:</span>{" "}
                {result.confidence}
              </p>

              <p>
                <span className="font-semibold">Treatment:</span>{" "}
                {result.treatment}
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DiseaseDetector;
