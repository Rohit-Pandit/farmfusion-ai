import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import { registerUser } from "../services/authService.js";

import  AuthContext  from "../context/AuthContext.js";

const Register = () => {

  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const { login } = React.useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await registerUser(formData);

       login(data);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert("Registration failed");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
        
        <h2 className="text-3xl font-bold mb-6 text-center">
          Register
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
  
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          
          <select
            name="role"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          >
            <option value="buyer">Buyer</option>

            <option value="farmer">Farmer</option>
          </select>

          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 text-white py-3 rounded-lg hover:bg-emerald-800 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default Register;