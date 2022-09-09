const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

//connection to database
mongoose.connect(
  "mongodb://localhost:27017/imageDb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("connected to db");
    } else {
      console.log("connection error to db");
    }
  }
);
// storage of image being uploaded
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploadimage/public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
});
//Database schema
const ImageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

module.exports = ImageModel = mongoose.model("imageModel", ImageSchema);

//upload image
app.post("/upload", upload.single("testImage"), (req, res) => {
  const saveImage = ImageModel({
    name: req.body.name,
    image: req.file.originalname,
    id: req.body.id,
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
  res.send("image is saved");
});

//fetch image
app.get("/getimg", async (req, res) => {
  const allData = await ImageModel.find();
  res.json(allData);
});

//fetch image by id
app.get("/fetch/:id", function (req, res) {
  fetchid = req.params.id;
  ImageModel.find({ id: fetchid }, function (err, val) {
    if (err) {
      res.send("Errror ");
    } else {
      if (val.length == 0) {
        res.send("data does not exist");
      } else {
        res.send(val);
      }
    }
  });
});
//listening on port 3003
app.listen(3003, () => {
  console.log("listening on port 3003");
});
