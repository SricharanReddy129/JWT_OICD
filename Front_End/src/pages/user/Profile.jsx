// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      
      axios
        .get("http://localhost:8000/general_user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProfile(res.data);
          console.log(res,user);
        })
        .catch((err) => {
          console.error("Failed to load profile", err);
        });
    }
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Profile</h2>
      <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Contact:</strong> {profile.contact}</p>
      <p><strong>Active:</strong> {profile.is_active ? "Yes" : "No"}</p>
      <button
        onClick={() => navigate("/profile/edit")}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Edit Profile
      </button>
    </div>
  );
}
