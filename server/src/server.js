import { InitApiRoute } from "./routes";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { error } from "console";
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: ["http://localhost:3000", "exp://192.168.1.2:8081"], //access-control-allow-origin
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
// middleware
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cookieParser(process.env.COOKIE_SECRET));
const filesDirectory = path.join(__dirname, "files");
app.use("/files", express.static(filesDirectory));
  
//connect to db
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
//routes
InitApiRoute(app);

const router = express.Router();
app.get("/abc", (req, res) => {
  return res
    .status(500)
    .json({ errcode: 500, message: "Server is not running" });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log("Server is started !!");
