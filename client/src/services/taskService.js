import api from "@/utils/api"

export const addTasks = async (taskData) => {
    const response = await api.post("/task", taskData);
    return response.data
}

export const getTasks = async (params = {}) => {
    const response = await api.get("/task", {params});
    return response.data
}

export const editTask = async (taskData, taskId) => {
    const response = await api.put(`/task/edit/${taskId}`, taskData);
    return response.data;
}

export const deleteTask = async (taskId) => {
    const response = await api.delete(`/task/delete/${taskId}`);
    return response.data
}

export const toggleStatus = async (taskId) => {
    const response = await api.patch(`/task/status/${taskId}`);
    return response.data
}