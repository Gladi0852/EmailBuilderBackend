import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getLayout } from "./Controller/EmailOperations.js";
import { saveTemplate } from "./Controller/EmailOperations.js";
import { downloadLayout } from "./Controller/EmailOperations.js";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";

//multer
const storage = multer.diskStorage({
  //where the file will store, cb = callback function
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  // generrate unique filename
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

//db connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database Connected");
}

// middlewares
server.use(cors());
server.use(express.json());
server.use(express.static("public"));
server.use("/public", express.static(path.join(__dirname, "public")));

//routing
server.get("/", (req, res) => {
  res.json("Hello");
});
server.get("/getEmailLayout", getLayout);
server.post("/savetemplate", upload.array("files", 2), saveTemplate);
server.get("/download/:id", downloadLayout);

server.listen(process.env.PORT_NUMBER, () => {
  try {
    console.log("Server started.");
  } catch (e) {
    console.log("Failed - ", e);
  }
});
