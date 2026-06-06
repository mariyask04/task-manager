"use client";

import { useEffect, useState } from "react";

export default function TaskForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [focused, setFocused] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSubmit(formData);
    if (!initialData) setFormData({ title: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Title */}
      <div>
        <label className={`block text-xs font-semibold tracking-widest uppercase mb-2 transition-colors duration-200 ${focused === "title" ? "text-amber-400" : "text-zinc-400"}`}>
          Task Title
        </label>
        <div className={`rounded-xl border transition-all duration-200 ${focused === "title" ? "border-amber-500/70 shadow-[0_0_0_3px_rgba(245,158,11,0.1)]" : "border-zinc-700 hover:border-zinc-600"}`}>
          <input
            type="text"
            name="title"
            placeholder="What needs to be done?"
            value={formData.title}
            onChange={handleChange}
            onFocus={() => setFocused("title")}
            onBlur={() => setFocused("")}
            className="w-full bg-zinc-800/50 text-white placeholder-zinc-500 px-4 py-3 rounded-xl outline-none text-sm"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={`block text-xs font-semibold tracking-widest uppercase mb-2 transition-colors duration-200 ${focused === "description" ? "text-amber-400" : "text-zinc-400"}`}>
          Description <span className="text-zinc-600 normal-case tracking-normal">(optional)</span>
        </label>
        <div className={`rounded-xl border transition-all duration-200 ${focused === "description" ? "border-amber-500/70 shadow-[0_0_0_3px_rgba(245,158,11,0.1)]" : "border-zinc-700 hover:border-zinc-600"}`}>
          <textarea
            name="description"
            placeholder="Add some details…"
            value={formData.description}
            onChange={handleChange}
            onFocus={() => setFocused("description")}
            onBlur={() => setFocused("")}
            rows={4}
            className="w-full bg-zinc-800/50 text-white placeholder-zinc-500 px-4 py-3 rounded-xl outline-none text-sm resize-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          className="flex-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3 rounded-xl transition-all duration-200 text-sm tracking-wider uppercase shadow-lg shadow-amber-500/20 active:scale-[0.98]"
        >
          {initialData ? "Update Task" : "Add Task →"}
        </button>

        {(initialData || onCancel) && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-zinc-200 text-sm font-semibold transition-all duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}