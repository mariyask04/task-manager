"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import TaskForm from "@/components/TaskFrom";
import TaskTable from "@/components/TaskTable";
import { useState, useEffect } from "react";
import { addTasks, deleteTask, editTask, getTasks, toggleStatus } from "@/services/taskService";

export default function DashboardPage() {
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const openCreateModal = () => { setEditingTask(null); setShowForm(true); };
  const openEditModal = (task) => { setEditingTask(task); setShowForm(true); };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks({ search, status, page, limit: 5 });
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, [search, status, page]);

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try { await deleteTask(id); fetchTasks(); } catch (e) { console.error(e); }
  };

  const handleToggleStatus = async (id) => {
    try { await toggleStatus(id); fetchTasks(); } catch (e) { console.error(e); }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await editTask(taskData, editingTask._id);
      setEditingTask(null); setShowForm(false); fetchTasks();
    } catch (e) { console.error(e); }
  };

  const handleCreateTask = async (taskData) => {
    try { await addTasks(taskData); setShowForm(false); fetchTasks(); }
    catch (e) { console.error(e); }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-zinc-950">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

          {/* Page header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-amber-500 text-xs font-semibold tracking-[0.25em] uppercase mb-1">Dashboard</p>
              <h1 className="text-4xl font-black text-white tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
                My Tasks
              </h1>
            </div>
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-5 py-2.5 rounded-xl text-sm tracking-wider uppercase shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 active:scale-[0.98] transition-all duration-200 self-start sm:self-auto"
            >
              <span className="text-lg leading-none">+</span>
              Add Task
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm pointer-events-none">⌕</span>
              <input
                type="text"
                placeholder="Search tasks…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)] text-white placeholder-zinc-500 pl-10 pr-4 py-2.5 rounded-xl outline-none text-sm transition-all duration-200"
              />
            </div>
            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1); }}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 text-zinc-300 px-4 py-2.5 rounded-xl outline-none text-sm transition-all duration-200 cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Table / loader */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full border-2 border-zinc-700" />
                <div className="absolute inset-0 rounded-full border-2 border-t-amber-500 animate-spin" />
              </div>
              <p className="text-zinc-600 text-xs tracking-widest uppercase animate-pulse">Loading tasks…</p>
            </div>
          ) : (
            <TaskTable tasks={tasks} onEdit={openEditModal} onDelete={handleDeleteTask} onToggle={handleToggleStatus} />
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium transition-all duration-150"
              >
                ← Prev
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-150 ${p === page
                        ? "bg-amber-500 text-zinc-950"
                        : "bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white"
                      }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium transition-all duration-150"
              >
                Next →
              </button>
            </div>
          )}

        </main>

        {/* Modal */}
        {showForm && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={(e) => { if (e.target === e.currentTarget) { setShowForm(false); setEditingTask(null); } }}
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl shadow-black/60">

              {/* Modal header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-amber-500 text-xs font-semibold tracking-[0.2em] uppercase mb-0.5">
                    {editingTask ? "Editing" : "New task"}
                  </p>
                  <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Georgia', serif" }}>
                    {editingTask ? "Update Task" : "Add Task"}
                  </h2>
                </div>
                <button
                  onClick={() => { setShowForm(false); setEditingTask(null); }}
                  className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-all text-lg"
                >
                  ✕
                </button>
              </div>

              <TaskForm
                initialData={editingTask}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                onCancel={() => { setShowForm(false); setEditingTask(null); }}
              />
            </div>
          </div>
        )}

      </div>
    </ProtectedRoute>
  );
}