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

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//connect to db
mongoose
  .connect("mongodb://127.0.0.1:27017/zaloClone", {
    useNewUrlParser: true,
    useUnifiedTopology: true

  })
  .then(() => {
    console.log("Connected to MongoDB");
  });

//route

app.use(cookieParser(process.env.COOKIE_SECRET));

InitApiRoute(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log("Server is started !!");
