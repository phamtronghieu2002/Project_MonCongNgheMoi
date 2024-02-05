import { InitApiRoute } from "./routes";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import helmet from "helmet";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
const app = express();
const port = process.env.PORT || 3000;
import jwt from "jsonwebtoken";
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//connect to db
mongoose
  .connect("mongodb://127.0.0.1:27017/zaloClone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });

//route

app.use(cookieParser(process.env.COOKIE_SECRET));

InitApiRoute(app);
//verify token

jwt.verify(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzA0MjQ2ZDdkNDA0NzU1MDg0NzMxMCIsImF2YXRhclBpY3R1cmUiOiIiLCJ1c2VybmFtZSI6ImhpZXUiLCJpYXQiOjE3MDcxMDcyMTgsImV4cCI6MTcwNzE5MzYxOH0.dvCzdxnneQDGpO17eZbn75cDsxzGwzkDZR9ur-hgZEU",
  process.env.FRESH_TOKEN_SECRET,
  (err, user) => {
  console.log("user:>>>>", user); 
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log("Server is started !!");
