"use client";

export default function TaskTable({ tasks, onEdit, onDelete, onToggle }) {
    if (!tasks.length) {
        return (
            <div className="border border-zinc-800 border-dashed rounded-2xl py-16 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-zinc-800/60 border border-zinc-700 flex items-center justify-center text-zinc-500 text-xl">
                    ✓
                </div>
                <p className="text-zinc-500 text-sm tracking-widest uppercase">No tasks found</p>
                <p className="text-zinc-600 text-xs mt-1">Create one to get started</p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-zinc-800 overflow-hidden">
            {/* Desktop table */}
            <table className="w-full hidden md:table">
                <thead>
                    <tr className="bg-zinc-800/60 border-b border-zinc-700">
                        {["Title", "Description", "Status", "Created", "Actions"].map((h) => (
                            <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 tracking-widest uppercase">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, i) => (
                        <tr
                            key={task._id}
                            className={`border-b border-zinc-800/60 hover:bg-zinc-800/30 transition-colors duration-150 ${i % 2 === 0 ? "bg-zinc-900/40" : "bg-zinc-900/20"}`}
                        >
                            <td className="px-5 py-4">
                                <span className={`font-semibold text-sm ${task.status === "completed" ? "line-through text-zinc-500" : "text-white"}`}>
                                    {task.title}
                                </span>
                            </td>

                            <td className="px-5 py-4 text-zinc-400 text-sm max-w-[200px] truncate">
                                {task.description || <span className="text-zinc-600 italic">No description</span>}
                            </td>

                            <td className="px-5 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${task.status === "completed"
                                        ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/50"
                                        : "bg-amber-950/60 text-amber-400 border border-amber-800/50"
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${task.status === "completed" ? "bg-emerald-400" : "bg-amber-400"}`} />
                                    {task.status}
                                </span>
                            </td>

                            <td className="px-5 py-4 text-zinc-500 text-sm">
                                {new Date(task.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </td>

                            <td className="px-5 py-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onToggle(task._id)}
                                        title="Toggle status"
                                        className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-emerald-950/60 border border-zinc-700 hover:border-emerald-700/60 text-zinc-400 hover:text-emerald-400 flex items-center justify-center transition-all duration-150 text-sm"
                                    >
                                        ✓
                                    </button>
                                    <button
                                        onClick={() => onEdit(task)}
                                        title="Edit task"
                                        className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-amber-950/60 border border-zinc-700 hover:border-amber-700/60 text-zinc-400 hover:text-amber-400 flex items-center justify-center transition-all duration-150 text-sm"
                                    >
                                        ✎
                                    </button>
                                    <button
                                        onClick={() => onDelete(task._id)}
                                        title="Delete task"
                                        className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-red-950/60 border border-zinc-700 hover:border-red-700/60 text-zinc-400 hover:text-red-400 flex items-center justify-center transition-all duration-150 text-sm"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-zinc-800">
                {tasks.map((task) => (
                    <div key={task._id} className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                            <span className={`font-semibold text-sm ${task.status === "completed" ? "line-through text-zinc-500" : "text-white"}`}>
                                {task.title}
                            </span>
                            <span className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${task.status === "completed"
                                    ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/50"
                                    : "bg-amber-950/60 text-amber-400 border border-amber-800/50"
                                }`}>
                                <span className={`w-1 h-1 rounded-full ${task.status === "completed" ? "bg-emerald-400" : "bg-amber-400"}`} />
                                {task.status}
                            </span>
                        </div>
                        {task.description && (
                            <p className="text-zinc-500 text-xs">{task.description}</p>
                        )}
                        <div className="flex items-center justify-between">
                            <span className="text-zinc-600 text-xs">
                                {new Date(task.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                            <div className="flex gap-2">
                                <button onClick={() => onToggle(task._id)} className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-emerald-950/60 border border-zinc-700 hover:border-emerald-700 text-zinc-400 hover:text-emerald-400 flex items-center justify-center text-sm transition-all">✓</button>
                                <button onClick={() => onEdit(task)} className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-amber-950/60 border border-zinc-700 hover:border-amber-700 text-zinc-400 hover:text-amber-400 flex items-center justify-center text-sm transition-all">✎</button>
                                <button onClick={() => onDelete(task._id)} className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-red-950/60 border border-zinc-700 hover:border-red-700 text-zinc-400 hover:text-red-400 flex items-center justify-center text-sm transition-all">✕</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}