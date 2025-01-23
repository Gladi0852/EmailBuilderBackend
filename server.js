const express = require("express");
const path = require("path");
const { fileURLToPath } = require("url");
const { getLayout, saveTemplate, downloadLayout } = require("./Controller/EmailOperations.js");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");


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
// const __dirname = path.resolve();

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
