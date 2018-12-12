const express = require("express");
const router = express.Router();
const db = require("../conn");
const upload = require("../services/image-upload");

const singleUpload = upload.single("image");

router.post("/", (req, res) => {
  let post = {
    userId: req.body.userId,
    img: req.body.img,
    description: req.body.description
  };
  let slq = "INSERT INTO post SET ?";
  db.query(slq, post, (err, result) => {
    if (err) throw err;
    res.status(200).json({ insertId: result.insertId });
  });
});

router.post("/image-upload", (req, res) => {
  singleUpload(req, res, function(err, some) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "Image Upload Error", detail: err.message }]
      });
    }
    return res.json({ imageUrl: req.file.location });
  });
});

module.exports = router;
