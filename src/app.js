//* Dependencies
const express = require("express");
const passport = require("passport");
const path = require('path');
const fs = require('fs');
require("./middleware/auth.middleware")(passport);

//*Route files
const userRouter = require("./users/users.router").router;
const authRouter = require("./auth/auth.router").router;
const programsRouter = require("./programs/programs.router").router;

//? Multer
const { uploadCovers, uploadChapters } = require("./utils/multer");

//* Initial configurations
const app = express();
const router = express.Router();

//? This setting is to habilitate the req.body
app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json({ message: "All ok!" });
});



app.use("/api/v1", router);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/programs", programsRouter);



app.get('/uploads/animes/:id_cover', (req, res) => {
  try {
    const { id_cover } = req.params;
    const coverPath = path.join(__dirname, '../media/covers', id_cover);

    if (!fs.existsSync(coverPath)) throw { message: "Image not found", status: 404 };

    res.status(200).sendFile(coverPath);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});


app.get('/uploads/anime/chapters/:id_chapter', (req, res) => {
  try {
    const { id_chapter } = req.params;
    const chapterPath = path.join(__dirname, '../media/chapters', id_chapter);

    if (!fs.existsSync(chapterPath)) throw { message: "Video not found", status: 404 };

    res.status(200).sendFile(chapterPath);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});


app.listen(8000, () => {
  console.log("Server started at port 8000");
});

exports.default = app