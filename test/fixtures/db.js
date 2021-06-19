const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");
const jwt = require("jsonwebtoken");

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "mess",
  email: "mess99@gmail.com",
  password: "mess1234!",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.TOKEN_STRING)
    }
  ]
};

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Rauf",
  email: "test99@gmail.com",
  password: "rauf1234!",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.TOKEN_STRING)
    }
  ]
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "first task",
  completed: false,
  owner: userOne._id
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "second task",
  completed: true,
  owner: userOne._id
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "third task",
  completed: false,
  owner: userTwo._id
};

const setUpDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOne,
  userOneId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  userTwoId,
  setUpDatabase
};
