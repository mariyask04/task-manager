"use client";

export default function TaskTable({
    tasks,
    onEdit,
    onDelete,
    onToggle,
}) {
    if (!tasks.length) {
        return (
            <div className="bg-white p-6 rounded-lg shadow text-center">
                No tasks found.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-4">Title</th>
                        <th className="p-4">
                            Description
                        </th>
                        <th className="p-4">Status</th>
                        <th className="p-4">
                            Created
                        </th>
                        <th className="p-4">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.map((task) => (
                        <tr
                            key={task._id}
                            className="border-t"
                        >
                            <td className="p-4 font-medium">
                                {task.title}
                            </td>

                            <td className="p-4">
                                {task.description}
                            </td>

                            <td className="p-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${task.status ===
                                        "completed"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {task.status}
                                </span>
                            </td>

                            <td className="p-4">
                                {new Date(
                                    task.createdAt
                                ).toLocaleDateString()}
                            </td>

                            <td className="p-4">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() =>
                                            onToggle(task._id)
                                        }
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        Toggle
                                    </button>

                                    <button
                                        onClick={() =>
                                            onEdit(task)
                                        }
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            onDelete(task._id)
                                        }
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}