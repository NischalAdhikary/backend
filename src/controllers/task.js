import Task from "../models/task.js";

const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return next({
        message: "Please provide title and description",
        status: 400,
        success: false,
      });
    }
    console.log(req.user);

    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });

    return res.status(201).json({
      message: "Task created successfully",
      success: true,
      task,
    });
  } catch (err) {
    return next({
      message: "Something went wrong",
      status: 500,
      success: false,
    });
  }
};
const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next({
      message: "Provide task id",
      success: false,
      status: 400,
    });
  }
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return next({
        message: "Task not found",
        success: false,
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Task dleeted successfully",
      success: true,
    });
  } catch (err) {
    next({
      message: "Something went wrong",
      status: 500,
      success: false,
    });
  }
};
const updateTask = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next({
      message: "Provide task id",
      success: false,
      status: 400,
    });
  }
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return next({
        message: "Please provide title and description",
        status: 400,
        success: false,
      });
    }
    const task = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );
    if (!task) {
      return next({
        message: "Task not found",
        success: false,
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Task updated successfully",
      success: true,
      task,
    });
  } catch (err) {
    return next({
      message: "Something went wrong",
      status: 500,
      success: false,
    });
  }
};
const getTask = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      user: req.user._id,
    });
    if (!tasks) {
      return next({
        message: "No tasks found",
        success: false,
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Tasks fetched successfully",
      success: true,
      tasks,
    });
  } catch (err) {
    return next({
      message: "Something went wrong",
      status: 500,
      success: false,
    });
  }
};
export { createTask, deleteTask, updateTask, getTask };
