import expressAsyncHandler from "express-async-handler";
import Task from "../models/taskmodels.js";

// ---------------------------------------------------
// GET ALL TASKS OF LOGGED-IN USER
// ---------------------------------------------------
export const home = expressAsyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
});

// ---------------------------------------------------
// CREATE NEW TASK
// ---------------------------------------------------
export const createtask = expressAsyncHandler(async (req, res) => {
    const { taskname } = req.body;

    if (!taskname) {
        res.status(400);
        throw new Error("Task name is required");
    }

    const task = await Task.create({
        taskname,
        user: req.user._id,
    });

    res.status(201).json(task);
});

// ---------------------------------------------------
// EDIT TASK (ONLY OWNER CAN EDIT)
// ---------------------------------------------------
export const edittask = expressAsyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }

    // Ownership check
    if (task.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("Not authorized to edit this task");
    }

    const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        { taskname: req.body.taskname },
        { new: true }
    );

    res.status(200).json(updatedTask);
});

// ---------------------------------------------------
// DELETE TASK (ONLY OWNER CAN DELETE)
// ---------------------------------------------------
export const del = expressAsyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Ownership check
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this task");
  }

  // ✅ FIX HERE
  await task.deleteOne();

  res.status(200).json({
    message: "Task deleted successfully",
    deletedId: req.params.id,
  });
});

