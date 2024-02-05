import express from "express";
import userRoute from "..//routes/user"
import authRoute from "..//routes/auth"
const InitApiRoute = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  

app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
};

export { InitApiRoute };
