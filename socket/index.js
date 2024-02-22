const io = require("socket.io")(9000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log("users connection :>>>", users);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on(
    "sendMessage",
    ({ senderId, recieverId, content, conversationId,new_message }) => {
      const reciever = getUser(recieverId);
      const sender = getUser(senderId);
      console.log("real time >>>")
      if (reciever) {
        io.to(reciever.socketId).emit("getMessage", {
          senderId,
          content,
          conversationId,
          new_message
        });
        io.to(reciever.socketId).emit("reRenderConversations", {
          senderId,
          content,
          conversationId,
        });
      }
      io.to(sender.socketId).emit("reRenderConversations", {
        senderId,
        content,
        conversationId,
      });
    }
  );

  socket.on("sendRequestFriend",({recieverId})=>{
    const reciever = getUser(recieverId);
    if (reciever) {
      io.to(reciever.socketId).emit("getFriendRequest");
    }
  
  })

  socket.on("acceptFriendRequest",(senderId)=>{
    const sender = getUser(senderId);
    if (senderId) {
      io.to(sender.socketId).emit("re-renderFriendRequest");
    }
  
  })
  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

console.log("====================================");
console.log("Socket server is running!");
console.log("====================================");
