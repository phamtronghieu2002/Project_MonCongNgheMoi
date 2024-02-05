import { InitApiRoute } from "./routes";
require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import helmet from "helmet";
import mongoose from "mongoose";
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//connect to db     
mongoose.connect(
  "mongodb://127.0.0.1:27017/zaloClone",
   { useNewUrlParser: true, useUnifiedTopology: true },
).then(() => { console.log("Connected to MongoDB"); })

//route


InitApiRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log("Server is started !!");
