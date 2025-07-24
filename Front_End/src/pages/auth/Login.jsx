import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });

      const token = res.data.access_token;
      const redirect = res.data.redirect;

      login(token);
      navigate(redirect);
      console.log(redirect);
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false); // 🔁 Reset loading state on both success and error
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setMail(e.target.value)}
          className="w-full mb-4 p-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded-md"
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Sign In"}
        </button>
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <button
            onClick={() => navigate("/register")}
            className="hover:underline"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/forgot")}
            className="hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
