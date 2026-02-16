const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

mongoose.connect("mongodb://127.0.0.1:27017/projectmanager");

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

io.on("connection", () => {
  console.log("User connected");
});

app.set("io", io);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
