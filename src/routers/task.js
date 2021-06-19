const express = require("express");
const auth = require("../middleware/auth");
const Task = require("../models/task");

const taskRouter = new express.Router();

taskRouter.post("/tasks", auth, async(req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

taskRouter.get("/tasks", auth, async(req, res) => {
    const match = {};
    const sort = {};

    if (req.query.completed) {
        match.completed = req.query.completed === "true";
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(":");
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
    try {
        await req.user
            .populate({
                path: "tasks",
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort
                }
            })
            .execPopulate();
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

taskRouter.get("/tasks/:id", auth, async(req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task) {
            res.status(404).send();
        }
        res.status(202).send(task);
    } catch (e) {
        res.status(500).send();
    }
});

taskRouter.patch("/tasks/:id", auth, async(req, res) => {
    const updates = Object.keys(req.body);
    const validUpdates = ["completed", "description"];
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

taskRouter.delete("/tasks/:id", auth, async(req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        return !task ? res.status(404).send() : res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = taskRouter;