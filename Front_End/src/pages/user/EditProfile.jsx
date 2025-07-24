// src/pages/EditProfile.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // adjust path if needed

export default function EditProfile() {
  const { user } = useAuth(); // get email from context
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:8000/general_user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => setForm(res.data))
        .catch((err) => {
          console.error("Failed to fetch profile", err);
        });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/general_user/profile`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Profile updated!");
      navigate("/profile");
    } catch (err) {
      alert("Update failed: " + (err.response?.data?.detail || err.message));
    }
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Edit Profile</h2>
      <input
        name="first_name"
        value={form.first_name || ""}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
        placeholder="First Name"
      />
      <input
        name="last_name"
        value={form.last_name || ""}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
        placeholder="Last Name"
      />
      <input
        name="contact"
        value={form.contact || ""}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
        placeholder="Contact"
      />
      <input
        name="password"
        type="password"
        value={form.password || ""}
        onChange={handleChange}
        className="w-full p-2 border mb-4"
        placeholder="New Password"
      />
      <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
}
