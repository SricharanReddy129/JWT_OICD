// src/pages/ForgotPassword.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      await axios.post("http://localhost:8000/auth/forgot-password", {
        email,
        new_password: newPassword,
      });
      alert("Password reset successfully");
      navigate("/");
    } catch (err) {
      alert("Error: " + err.response?.data?.detail || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Forgot Password</h2>
        <input
          placeholder="Your email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="New password"
          type="password"
          className="w-full p-2 mb-4 border rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
