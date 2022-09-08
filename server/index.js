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
// storage
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/image-upload/public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
});
//schema
const ImageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  id: {
    type: Number,
  },
});

module.exports = ImageModel = mongoose.model("imageModel", ImageSchema);

//upload image
app.post("/upload", upload.single("testImage"), (req, res) => {
  const saveImage = ImageModel({
    name: req.body.name,
    img: {
      contentType: "image/png",
    },
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
//listen
app.listen(3003, () => {
  console.log("listening on port 3003");
});
