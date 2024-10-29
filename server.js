
const express = require("express");
const path = require("path");
const { Socket } = require("socket.io");
const app = express();
const server = require("http").createServer(app);

const io=require("socket.io")(server);

app.use(express.static(path.join(__dirname + "/public")));

io.on("connection",function(Socket){
  Socket.on("newuser",function(username){
  Socket.broadcast.emit("update",username +" joined the conversation" );
  });
  Socket.on("exituser",function(username){
    Socket.broadcast.emit("update",username +" left the conversation" );
    });
    Socket.on("chat",function(message){
        Socket.broadcast.emit("chat",message );
        });
});

server.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
