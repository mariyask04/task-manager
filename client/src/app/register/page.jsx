"use client";

import { registerUser } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        if (error) setError("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.password.trim()
        ) {
            return setError("All fields are required");
        }
        try {
            setLoading(true);
            const data = await registerUser(formData);
            router.push("/");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Register
                </h1>
                {error && (
                    <div className="mb-4 rounded bg-red-100 p-3 text-red-600">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-1 font-medium">
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:opacity-90"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <span className="text-blue-600 cursor-pointer" onClick={() => { router.push("/") }}>
                        Login
                    </span>
                </p>

            </div>
        </div>
    );
}