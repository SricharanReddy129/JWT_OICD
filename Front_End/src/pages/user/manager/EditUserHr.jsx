// src/pages/EditUserHr.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditUserHr() {
  const { user_id } = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:8000/general_user/edit-user/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setForm(res.data))
      .catch((err) => {
        alert("Unauthorized or user not found");
        navigate("/home");
      });
  }, [user_id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:8000/general_user/edit-user/${user_id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("User updated successfully");
      navigate("/home");
    } catch (err) {
      alert("Update failed: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Edit User</h2>

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

      <label className="block mt-4 mb-2">
        <input
          type="checkbox"
          name="is_active"
          checked={form.is_active || false}
          onChange={handleChange}
          className="mr-2"
        />
        Active
      </label>

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Save
      </button>
    </div>
  );
}
