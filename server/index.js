const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Store users in rooms
const usersInRooms = {};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`User ${socket.id} joined room: ${data.room}, User Name: ${data.userName}`);

    // Add user to the list of users in the room
    if (!usersInRooms[data.room]) {
      usersInRooms[data.room] = [];
    }
    usersInRooms[data.room].push({ id: socket.id, name: data.userName });

    // Emit the updated list of users in the room
    io.to(data.room).emit("update_users", { users: usersInRooms[data.room].map(user => user.name) });
  });

  socket.on("send_message", (data) => {
    console.log(`User ${socket.id} sent message in room ${data.room}: ${data.message}`);
    io.to(data.room).emit("receive_message", data);
  });

  socket.on("send_image", (data) => {
    console.log(`User ${socket.id} sent image in room ${data.room}`);
    // Broadcast the image to other clients in the room
    socket.to(data.room).emit("receive_image", { image: data.image, userName: data.userName });
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
    
    // Remove user from the list of users in the room
    Object.keys(usersInRooms).forEach((room) => {
      const index = usersInRooms[room].findIndex(user => user.id === socket.id);
      if (index !== -1) {
        usersInRooms[room].splice(index, 1);
        io.to(room).emit("update_users", { users: usersInRooms[room].map(user => user.name) });
      }
    });
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
