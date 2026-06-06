"use client";

import { useEffect, useState } from "react";

export default function TaskForm({
    onSubmit,
    initialData,
    onCancel,
}) {
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                description: initialData.description || ""
            })
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            return;
        }
        onSubmit(formData);
        if (!initialData) {
            setFormData({
                title: "",
                description: "",
            });
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border rounded-md px-3 py-2"
                />

                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="bg-black text-white px-5 py-2 rounded-md"
                    >
                        {initialData
                            ? "Update Task"
                            : "Add Task"}
                    </button>

                    {initialData && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="border px-5 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}