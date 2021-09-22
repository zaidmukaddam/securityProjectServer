const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
let bodyParser = require("body-parser");

require("dotenv").config();

const mongoose = require("mongoose");

let apiRoutes = require("./api-router");

// Connect to Mongoose and set connection variable
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

app.use("/api", apiRoutes);

io.on("connection", (socket) => {
  //Get the chatID of the user and join in a room of the same chatID
  chatID = socket.handshake.query.chatID;
  socket.join(chatID);
  console.log("User connected :" + chatID);

  //Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(chatID);
    console.log("User disconnected :" + chatID);
  });

  //Send message to only a particular user
  socket.on("send_message", (message) => {
    console.log("OnSent :" + message);
    receiverChatID = message.receiverChatID;
    senderChatID = message.senderChatID;
    content = message.content;

    //Send message to only that particular room
    socket.in(receiverChatID).emit("receive_message", {
      content: content,
      senderChatID: senderChatID,
      receiverChatID: receiverChatID,
      sentAt: Date.now(),
    });
  });
});

console.log(`You are online on : ${process.env.PORT || 3000}`);
http.listen(process.env.PORT || 3000);
