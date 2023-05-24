const express = require("express");
const socketIO = require("socket.io");
let cors = require("cors"); //tránh lỗi CORS
const app = express();
const server = require("http").Server(app);
// app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "Content-Type",
//     "Authorization"
//   );
//   next();
// });

app.get("/", cors(), (req, res) => {
  return res.send("Abcxyz");
});

server.listen(8080, () => {
  console.log("Server started on port 8080");
});

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("Đã có người kết nối");

  socket.on("disconect", () => {
    console.log("Đã có đứa out");
  });

  socket.on("chat-message", (data) => {
    console.log(socket.id + "_" + data);
    io.emit("chat-message", {
      id: socket.id,
      message: data,
    });
  });
});
