import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username.trim()) {
      setError("Username tidak boleh kosong.");
      return;
    }
    if (!password) {
      setError("Password tidak boleh kosong.");
      return;
    }
    if (username === "admin" && password === "1234") {
      localStorage.setItem("user", username);
      navigate("/home");
    } else {
      setError("Username atau password salah!");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-[#e8e8e8] to-[#c8c8c8]">

      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-black text-yellow-400 flex items-center justify-center text-3xl font-bold shadow-xl mb-3">
          C
        </div>
        <h1 className="text-2xl font-bold leading-none text-black">C-Solve</h1>
        <p className="text-xs text-black/50 mt-1">Learn C Programming</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-sm">
        <h2 className="text-center text-base font-bold text-black/70 mb-6">
          Masukkan Username
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-xs text-black/50 mb-1 font-bold">
            Username
          </label>
          <input
            type="text"
            placeholder="Nama"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#fafafa] text-sm text-black placeholder-black/30 outline-none focus:border-yellow-400 focus:bg-white transition-all duration-200"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-xs text-black/50 mb-1 font-bold">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#fafafa] text-sm text-black placeholder-black/30 outline-none focus:border-yellow-400 focus:bg-white transition-all duration-200"
          />
        </div>

        {/* Error message */}
        <div className="min-h-[20px] mb-3">
          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-black text-yellow-400 rounded-2xl font-bold text-base shadow-lg hover:bg-yellow-400 hover:text-black transition-all duration-300 hover:scale-105"
        >
          Masuk
        </button>

        {/* Hint */}
        <p className="text-center text-xs text-black/30 mt-4">
          Demo: admin / 1234
        </p>
      </div>
    </div>
  );
}
