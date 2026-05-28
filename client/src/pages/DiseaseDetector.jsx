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

      console.log("Prediction Data:", data);

      setResult(data.prediction);

      toast.success("Disease detected");
    } catch (error) {
      console.error(error);

      toast.error("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const isHealthy = result.disease.toLowerCase().includes("healthy");
  const confidenceValue = parseFloat(result.confidence);
  const confidenceColor =
    confidenceValue >= 80
      ? "bg-emerald-600"
      : confidenceValue >= 50
        ? "bg-yellow-500"
        : "bg-red-500";

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
            <div className="bg-white shadow-lg rounded-2xl p-6 mt-8 border">
              <h2 className="text-2xl font-bold mb-4">Prediction Result</h2>

              <div
                className={`inline-block px-4 py-2 rounded-full font-semibold ${
                  isHealthy
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                🌿 {result.disease}
              </div>

              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-emerald-700">
                    Confidence
                  </span>

                  <span className="text-sm font-medium text-emerald-700">
                    {result.confidence}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={
                      confidenceColor +
                      " h-3 rounded-full transition-all duration-500"
                    }
                    style={{
                      width: result.confidence,
                    }}
                  ></div>
                </div>
              </div>
              <div className="mt-5 bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                <h3 className="font-semibold text-emerald-700 mb-2">
                  Recommended Treatment
                </h3>

                <p className="text-gray-700">{result.treatment}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DiseaseDetector;
