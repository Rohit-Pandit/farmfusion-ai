import { Link } from "react-router-dom";
import React from "react";
import Authcontext from "../context/AuthContext.js";

const Home = () => {
  const { user } = React.useContext(Authcontext);
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
            Smart Agriculture <br />
            Powered By <span className="text-emerald-600">AI</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
            FarmFusion helps farmers and buyers connect seamlessly with
            AI-powered crop disease detection, smart marketplace features,
            analytics, and real-time farming solutions.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/marketplace"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold shadow-md transition"
            >
              Explore Marketplace
            </Link>

            <Link
              to="/disease-detector"
              className="border border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-xl font-semibold transition"
            >
              Detect Disease
            </Link>

            {user ? (
              <div className="bg-emerald-100 text-emerald-700 px-6 py-4 rounded-xl font-semibold shadow-sm">
                Welcome, {user.user.name} 👋
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-xl font-semibold transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop"
            alt="Agriculture"
            className="rounded-3xl shadow-2xl w-full max-w-xl object-cover"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose FarmFusion?
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Everything farmers need in one modern platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* CARD */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-5">🌿</div>

            <h3 className="text-2xl font-bold mb-3">AI Detection</h3>

            <p className="text-gray-600">
              Detect crop diseases instantly using TensorFlow-powered AI.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-5">🛒</div>

            <h3 className="text-2xl font-bold mb-3">Marketplace</h3>

            <p className="text-gray-600">
              Farmers can sell crops directly to buyers without middlemen.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-5">📊</div>

            <h3 className="text-2xl font-bold mb-3">Analytics</h3>

            <p className="text-gray-600">
              Monitor orders, sales, and farming insights in real-time.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-5">🚜</div>

            <h3 className="text-2xl font-bold mb-3">Smart Farming</h3>

            <p className="text-gray-600">
              Bringing technology and agriculture together for better outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-emerald-600 py-16 mt-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center text-white">
          <div>
            <h3 className="text-5xl font-extrabold">100+</h3>

            <p className="mt-3 text-lg">Crops Listed</p>
          </div>

          <div>
            <h3 className="text-5xl font-extrabold">AI</h3>

            <p className="mt-3 text-lg">Powered Disease Detection</p>
          </div>

          <div>
            <h3 className="text-5xl font-extrabold">24/7</h3>

            <p className="mt-3 text-lg">Marketplace Access</p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-8 mt-0">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-white">FarmFusion</h2>

          <p>Empowering agriculture with AI & smart technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
