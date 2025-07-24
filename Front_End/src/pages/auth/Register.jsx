// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    mail: "",
    contact: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:8000/auth/register", form);
      alert("Registered successfully!");
      navigate("/");
    } catch (err) {
      alert("Registration failed: " + err.response?.data?.detail || err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Register</h2>
        <input name="first_name" placeholder="First Name" className="w-full p-2 mb-2 border rounded" onChange={handleChange} />
        <input name="last_name" placeholder="Last Name" className="w-full p-2 mb-2 border rounded" onChange={handleChange} />
        <input name="mail" type="email" placeholder="Email" className="w-full p-2 mb-2 border rounded" onChange={handleChange} />
        <input name="contact" placeholder="Contact" className="w-full p-2 mb-2 border rounded" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" onChange={handleChange} />
        <button onClick={handleRegister} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Sign Up</button>
      </div>
    </div>
  );
}
