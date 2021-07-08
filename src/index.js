const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const proxy = require("http-proxy-middleware");
const path = require("path");
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = function (app) {
  // add other server routes to path array
  app.use(proxy(["/"], { target: "http://localhost:5000" }));
};

// Set the static folder
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
  // Add production middleware such as redirecting to https

  // Express will serve up production assets i.e. main.js
  app.use("/static", express.static(path.join(`${__dirname}/client/build`)));
  // If Express doesn't recognize route serve index.html
  app.get("/*", (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/`));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
