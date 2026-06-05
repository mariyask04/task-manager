import Task from "../models/Task.model.js";

//create task
const addTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }
        const task = await Task.create({
            userId: req.user._id,
            title,
            description
        });
        res.status(201).json({
            success: true,
            task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//read all tasks for a user
const getAllTasks = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;;
        const search = req.query.search || "";
        const status = req.query.status || "";

        const query = {
            userId: req.user._id
        }

        if (search) {
            query.title = {
                $regex: search,
                $options: "i"
            };
        }
        if (status) {
            query.status = status;
        }
        const total = await Task.countDocuments(query);
        const tasks = await Task.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)

        res.status(200).json({
            success: true,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//read a task for a user
// const getTaskById = async (req, res) => {
//     try {
//         const id = req.params.id
//     } catch (error) {

//     }
// }

//update task
const editTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const taskId = req.params.taskId;
        const task = await Task.findOne({
            _id: taskId,
            userId: req.user._id
        });
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        task.title = title || task.title;
        task.description = description || task.description;
        await task.save();
        res.status(200).json({
            success: true,
            task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//delete task
const removeTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findOne({
            _id: taskId,
            userId: req.user._id
        });
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        await task.deleteOne();
        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
        res.status(500).json({
            success: false,
            message: error.message
        });
    } catch (error) {

    }
}

//toggle task status
const updateTaskStatus = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findOne({
            _id: taskId,
            userId: req.user._id
        });
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        task.status = task.status === "pending" ? "completed" : "pending";
        await task.save();
        res.status(200).json({
            success: true,
            task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export {
    addTask,
    getAllTasks,
    editTask,
    removeTask,
    updateTaskStatus
}