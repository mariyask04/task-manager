"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordDisplay = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password)
      return setError("Please fill all fields");
    try {
      setLoading(true);
      const data = await loginUser(formData);
      login(data.user, data.token);
      router.push("/dashboard");
    } catch (error) {
      setError(
        JSON.stringify(error.response?.data) || error.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Decorative geometric background blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-zinc-800/50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-zinc-800/30 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Header accent */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/60" />
          <div className="w-2 h-2 rotate-45 bg-amber-500" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/60" />
        </div>

        <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 shadow-2xl shadow-black/60">

          {/* Title */}
          <div className="mb-8">
            <p className="text-amber-500 text-xs font-semibold tracking-[0.25em] uppercase mb-1">Welcome back</p>
            <h1 className="text-4xl font-black text-white tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
              Sign In
            </h1>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 bg-red-950/60 border border-red-800/60 text-red-400 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
              <span className="mt-0.5 text-red-500">⚠</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="group">
              <label className={`block text-xs font-semibold tracking-widest uppercase mb-2 transition-colors duration-200 ${focused === "email" ? "text-amber-400" : "text-zinc-400"}`}>
                Email Address
              </label>
              <div className={`relative rounded-xl border transition-all duration-200 ${focused === "email" ? "border-amber-500/70 shadow-[0_0_0_3px_rgba(245,158,11,0.1)]" : "border-zinc-700 hover:border-zinc-600"}`}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  placeholder="you@example.com"
                  className="w-full bg-zinc-800/50 text-white placeholder-zinc-500 px-4 py-3 rounded-xl outline-none text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className={`block text-xs font-semibold tracking-widest uppercase mb-2 transition-colors duration-200 ${focused === "password" ? "text-amber-400" : "text-zinc-400"}`}>
                Password
              </label>
              <div className={`relative rounded-xl border transition-all duration-200 ${focused === "password" ? "border-amber-500/70 shadow-[0_0_0_3px_rgba(245,158,11,0.1)]" : "border-zinc-700 hover:border-zinc-600"}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  placeholder="Enter your password"
                  className="w-full bg-zinc-800/50 text-white placeholder-zinc-500 px-4 py-3 rounded-xl outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={togglePasswordDisplay}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-400 hover:text-amber-400"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 relative overflow-hidden bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 disabled:text-zinc-400 text-zinc-950 font-bold py-3 rounded-xl transition-all duration-200 text-sm tracking-wider uppercase shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-zinc-900/40 border-t-zinc-900 rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
            <p className="text-zinc-500 text-sm">
              No account yet?{" "}
              <span
                onClick={() => router.push("/register")}
                className="text-amber-400 hover:text-amber-300 cursor-pointer font-semibold transition-colors duration-150"
              >
                Create one →
              </span>
            </p>
          </div>

        </div>

        {/* Bottom accent */}
        <div className="flex items-center gap-3 mt-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-700" />
          <span className="text-zinc-600 text-xs tracking-widest uppercase">Task Manager</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-700" />
        </div>

      </div>
    </div>
  );
}