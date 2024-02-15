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
      console.log("users connection :>>>",users)
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, recieverId, content ,conversationId}) => {
      const user = getUser(recieverId);

      if(user)
      {
        console.log("co emit">>user.socketId)
        io.to(user.socketId).emit("getMessage", {
          senderId,
          content,
          conversationId
   
        });
      }

    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
  


console.log('====================================');
console.log("Socket server is running!");
console.log('====================================');