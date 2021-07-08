const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const path = require("path");
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  // add other server routes to path array
  app.use(proxy(["/"], { target: "http://localhost:5000" }));
};

// Set the static folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
