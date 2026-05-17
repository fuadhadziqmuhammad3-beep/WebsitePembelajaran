import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { ref, get, set } from "firebase/database";

export default function Login() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    if (!username.trim() || !password) {
      setError("Username dan password wajib diisi.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const snap = await get(ref(db, `users/${username}`));
      if (!snap.exists()) {
        setError("Username tidak ditemukan.");
        return;
      }
      const data = snap.val();
      if (data.password !== password) {
        setError("Password salah.");
        return;
      }
      localStorage.setItem("user", username);
      localStorage.setItem("globalXP", data.xp || 0);
      navigate("/home");
    } catch (e) {
      setError("Gagal login. Cek koneksi internet.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister() {
    if (!username.trim() || !password || !confirmPass) {
      setError("Semua field wajib diisi.");
      return;
    }
    if (username.length < 3) {
      setError("Username minimal 3 karakter.");
      return;
    }
    if (password.length < 4) {
      setError("Password minimal 4 karakter.");
      return;
    }
    if (password !== confirmPass) {
      setError("Password tidak cocok.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const snap = await get(ref(db, `users/${username}`));
      if (snap.exists()) {
        setError("Username sudah dipakai, pilih yang lain.");
        return;
      }
      await set(ref(db, `users/${username}`), {
        username,
        password,
        xp: 0,
        createdAt: Date.now(),
      });
      localStorage.setItem("user", username);
      localStorage.setItem("globalXP", 0);
      navigate("/home");
    } catch (e) {
      setError("Gagal daftar. Cek koneksi internet.");
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") mode === "login" ? handleLogin() : handleRegister();
  };

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 12,
    border: "1.5px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    fontSize: 14,
    outline: "none",
    fontFamily: "Poppins, sans-serif",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "Poppins, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: "rgba(250,204,21,0.05)", filter: "blur(100px)", pointerEvents: "none" }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(250,204,21,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "2rem", position: "relative", zIndex: 1 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 18, margin: "0 auto 12px",
          background: "linear-gradient(135deg, #facc15, #f59e0b)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 28, color: "#000",
          boxShadow: "0 0 40px rgba(250,204,21,0.3)",
        }}>C</div>
        <div style={{ fontWeight: 800, fontSize: 22, color: "#fff" }}>C-Solve</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Learn C Programming</div>
      </div>

      {/* Card */}
      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 24, padding: "2.5rem",
        width: "100%", maxWidth: 380,
        position: "relative", zIndex: 1,
      }}>
        {/* Tab switch */}
        <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 4, marginBottom: "1.75rem" }}>
          {["login", "register"].map((m) => (
            <button key={m} onClick={() => { setMode(m); setError(""); setUsername(""); setPassword(""); setConfirmPass(""); }}
              style={{
                flex: 1, padding: "9px", borderRadius: 9, border: "none",
                background: mode === m ? "rgba(250,204,21,1)" : "transparent",
                color: mode === m ? "#000" : "rgba(255,255,255,0.5)",
                fontWeight: 700, fontSize: 13, cursor: "pointer",
                fontFamily: "Poppins, sans-serif", transition: "all 0.2s",
              }}>
              {m === "login" ? "Masuk" : "Daftar"}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600, display: "block", marginBottom: 6 }}>Username</label>
          <input
            type="text"
            placeholder="Masukkan username"
            value={username}
            onChange={e => { setUsername(e.target.value); setError(""); }}
            onKeyDown={handleKeyDown}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = "rgba(250,204,21,0.6)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
          />
        </div>

        <div style={{ marginBottom: mode === "register" ? "1rem" : "0.5rem" }}>
          <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600, display: "block", marginBottom: 6 }}>Password</label>
          <input
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(""); }}
            onKeyDown={handleKeyDown}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = "rgba(250,204,21,0.6)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
          />
        </div>

        {mode === "register" && (
          <div style={{ marginBottom: "0.5rem" }}>
            <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600, display: "block", marginBottom: 6 }}>Konfirmasi Password</label>
            <input
              type="password"
              placeholder="Ulangi password"
              value={confirmPass}
              onChange={e => { setConfirmPass(e.target.value); setError(""); }}
              onKeyDown={handleKeyDown}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = "rgba(250,204,21,0.6)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>
        )}

        {/* Error */}
        <div style={{ minHeight: 24, marginBottom: "0.75rem" }}>
          {error && <p style={{ fontSize: 12, color: "#f87171", margin: 0, fontWeight: 600 }}>⚠ {error}</p>}
        </div>

        {/* Submit button */}
        <button
          onClick={mode === "login" ? handleLogin : handleRegister}
          disabled={loading}
          style={{
            width: "100%", padding: "13px",
            background: loading ? "rgba(250,204,21,0.4)" : "linear-gradient(135deg, #facc15, #f59e0b)",
            border: "none", borderRadius: 14,
            color: "#000", fontWeight: 800, fontSize: 15,
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "Poppins, sans-serif", transition: "all 0.2s",
          }}
          onMouseEnter={e => { if (!loading) e.target.style.transform = "scale(1.02)"; }}
          onMouseLeave={e => { e.target.style.transform = "scale(1)"; }}
        >
          {loading ? "Memproses..." : mode === "login" ? "Masuk →" : "Daftar Sekarang →"}
        </button>
      </div>
    </div>
  );
}
