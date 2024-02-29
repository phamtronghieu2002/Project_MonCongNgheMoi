import express from "express";
import userRoute from "..//routes/user"
import authRoute from "..//routes/auth"
import converationRoute from "..//routes/conversation"
import requestFriendRoute from "..//routes/requestFriend"
import messageRoute from "..//routes/message"
import groupRoute from "..//routes/group"
const InitApiRoute = (app) => {
  app.use( (req, res, next) =>{
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  

app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/conversation", converationRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/group", groupRoute);
app.use("/api/v1/requestFriend", requestFriendRoute);
};

export { InitApiRoute };
