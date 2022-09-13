//* Dependencies
const express = require("express");
const path = require("path");

//*Route files
const programRouter = require("./programs/programs.router").router;
const chapterRouter = require("./chapters/chapters.router").router;

//* Initial settings
const app = express();

//? This config is to enable the req.body
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "All ok!" });
});

app.use("/api/v1/programs", programRouter);
app.use("/api/v1/programs/:program_id/chapters", chapterRouter);

app.get("/uploads/animes/:imgName", (req, res) => {
  const imgName = req.params.imgName;
  res
    .status(200)
    .sendFile(path.resolve("uploads/media/covers") + "/" + imgName);
});

app.get("/uploads/anime/chapters/:chapter", (req, res) => {
  const chapterName = req.params.chapter;
  console.log(path.resolve("uploads/media/episodes/"));
  res
    .status(200)
    .sendFile(path.resolve("uploads/media/episodes/") + "/" + chapterName);
});

app.listen(8000, () => {
  console.log("Server started at port 8000");
});

exports.default = app;
exports.app = app;
module.exports = app;
