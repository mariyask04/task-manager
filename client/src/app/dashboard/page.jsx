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

  const openCreateModal = () => {
    setEditingTask(null);
    setShowForm(true);
  }

  const openEditModal = (task) => {
    setEditingTask(task);
    setShowForm(true);
  }

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks({
        search,
        status,
        page,
        limit: 5,
      });
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, status, page]);

  const handleDeleteTask = async (id) => {
    const confirmed = window.confirm(
      "Delete this task?"
    );
    if (!confirmed) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  }

  const handleToggleStatus = async (id) => {
    try {
      await toggleStatus(id);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdateTask = async (taskData) => {
    try {
      await editTask(
        taskData,
        editingTask._id
      );
      setEditingTask(null);
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  }

  const handleCreateTask = async (taskData) => {
    try {
      await addTasks(taskData);
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="max-w-7xl mx-auto p-6">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <h1 className="text-3xl font-bold">
            Tasks
          </h1>

          <button
            onClick={openCreateModal}
            className="bg-black text-white px-5 py-2 rounded-md"
          >
            + Add Task
          </button>

        </div>

        {/* Filters */}

        <div className="flex flex-col md:flex-row gap-4 mb-6">

          <input
            type="text"
            placeholder="Search task title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border rounded-md px-4 py-2 flex-1"
          />

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="border rounded-md px-4 py-2"
          >
            <option value="">
              All Status
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="completed">
              Completed
            </option>
          </select>

        </div>

        {/* Table */}

        {loading ? (
          <div className="text-center py-10">
            Loading...
          </div>
        ) : (
          <TaskTable
            tasks={tasks}
            onEdit={openEditModal}
            onDelete={handleDeleteTask}
            onToggle={
              handleToggleStatus
            }
          />
        )}

        {/* Pagination */}

        <div className="flex justify-center gap-2 mt-6">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
            className="border px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2">
            {page} / {totalPages}
          </span>

          <button
            disabled={
              page === totalPages
            }
            onClick={() =>
              setPage(page + 1)
            }
            className="border px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

        {/* Modal */}

        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4">

            <div className="bg-white rounded-lg p-6 w-full max-w-xl">

              <h2 className="text-2xl font-bold mb-4">
                {editingTask
                  ? "Edit Task"
                  : "Add Task"}
              </h2>

              <TaskForm
                initialData={
                  editingTask
                }
                onSubmit={
                  editingTask
                    ? handleUpdateTask
                    : handleCreateTask
                }
                onCancel={() => {
                  setShowForm(false);
                  setEditingTask(null);
                }}
              />

            </div>

          </div>
        )}

      </main>
    </ProtectedRoute>
  )
}