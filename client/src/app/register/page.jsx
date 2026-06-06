"use client";

import { registerUser } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim())
      return setError("All fields are required");
    try {
      setLoading(true);
      await registerUser(formData);
      router.push("/");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
    { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
    { key: "password", label: "Password", type: "password", placeholder: "Create a strong password" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute top-[-100px] right-[-100px] w-80 h-80 rounded-full bg-amber-500/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-80px] w-96 h-96 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-zinc-800/40 pointer-events-none" />

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
            <p className="text-amber-500 text-xs font-semibold tracking-[0.25em] uppercase mb-1">Get started</p>
            <h1 className="text-4xl font-black text-white tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
              Create Account
            </h1>
          </div>

          {/* Step indicator */}
          <div className="flex gap-1.5 mb-6">
            {fields.map((f, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${formData[f.key] ? "bg-amber-500" : "bg-zinc-700"}`}
              />
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 bg-red-950/60 border border-red-800/60 text-red-400 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
              <span className="mt-0.5 text-red-500">⚠</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className={`block text-xs font-semibold tracking-widest uppercase mb-2 transition-colors duration-200 ${focused === key ? "text-amber-400" : "text-zinc-400"}`}>
                  {label}
                </label>
                <div className={`rounded-xl border transition-all duration-200 ${focused === key ? "border-amber-500/70 shadow-[0_0_0_3px_rgba(245,158,11,0.1)]" : "border-zinc-700 hover:border-zinc-600"}`}>
                  <input
                    type={type}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    onFocus={() => setFocused(key)}
                    onBlur={() => setFocused("")}
                    placeholder={placeholder}
                    className="w-full bg-zinc-800/50 text-white placeholder-zinc-500 px-4 py-3 rounded-xl outline-none text-sm"
                  />
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 disabled:text-zinc-400 text-zinc-950 font-bold py-3 rounded-xl transition-all duration-200 text-sm tracking-wider uppercase shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-zinc-900/40 border-t-zinc-900 rounded-full animate-spin" />
                  Creating Account…
                </span>
              ) : "Create Account →"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
            <p className="text-zinc-500 text-sm">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/")}
                className="text-amber-400 hover:text-amber-300 cursor-pointer font-semibold transition-colors duration-150"
              >
                Sign in →
              </span>
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3 mt-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-700" />
          <span className="text-zinc-600 text-xs tracking-widest uppercase">Task Manager</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-700" />
        </div>

      </div>
    </div>
  );
}