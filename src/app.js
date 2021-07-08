// const express = require("express");
// require("./db/mongoose");
// const userRouter = require("./routers/user");
// const taskRouter = require("./routers/task");
// const path = require("path");
// const app = express();

// app.use(express.json());
// app.use(userRouter);
// app.use(taskRouter);

// // Set the static folder
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

// module.exports = app;
