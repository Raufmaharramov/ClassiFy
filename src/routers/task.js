const express = require("express");
const auth = require("../middleware/auth");
const Task = require("../models/task");

const taskRouter = new express.Router();

taskRouter.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ completed: false, owner: req.user._id }).sort({ createdAt: -1 });
    if (!tasks) {
      res.status(401).send("No post found!");
    }

    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

taskRouter.get("/categories/:category", auth, async (req, res) => {
  const cat = req.params.category;
  try {
    const tasks = await Task.find({ category: cat, owner: req.user.id, completed: false }).sort({ createdAt: -1 });
    if (!tasks) {
      res.status(404).send("Not Found");
    }
    res.status(202).send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

taskRouter.post("/tasks", auth, async (req, res) => {
  // const task = new Task({
  //     ...req.body,
  //     owner: req.user._id
  // });

  const taskFields = {};

  const { title, category, description } = req.body;

  if (title) taskFields.title = title;
  if (category) taskFields.category = category;
  if (description) taskFields.description = description;

  try {
    const task = new Task({ ...taskFields, owner: req.user._id });
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

taskRouter.get("/completed", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ completed: true, owner: req.user.id }).sort({ updatedAt: -1 });
    if (!tasks) {
      res.status(404).send("Not Found");
    }
    res.status(202).send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

taskRouter.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user.id });

    if (!task) {
      res.status(404).send();
    }
    res.status(202).send(task);
  } catch (e) {
    res.status(500).send();
  }
});

taskRouter.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ["completed", "description", "category", "title"];
  const isValid = updates.every(elem => validUpdates.includes(elem));

  if (!isValid) {
    return res.status(404).send({ error: "Invalid update try" });
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    if (!task) {
      res.status(404).send();
    }

    updates.forEach(el => (task[el] = req.body[el]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

taskRouter.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    return !task ? res.status(404).send() : res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = taskRouter;
