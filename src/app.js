//* Dependencias
const express = require("express");
const passport = require("passport");
const { uploadCovers, uploadChapters } = require("./utils/multer");
require("./middleware/auth.middleware")(passport);

//*Archivos de rutas
const userRouter = require("./users/users.router").router;
const authRouter = require("./auth/auth.router").router;
const programsRouter = require("./programs/programs.router").router;

//* Configuraciones iniciales
const app = express();
const router = express.Router();

//? Esta configuracion es para habilitar el req.body
app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json({ message: "All ok!" });
});

app.post('/prueba-covers', uploadCovers.single('cover-img'), (req, res) => {
  const { title, description } = req.body;
  res.status(200).json({ message: req.file.filename, title, description });
});

app.post('/prueba-chapters', uploadChapters.single('chapter-video'), (req, res) => {
  const { program_id, chapter_num } = req.body;
  res.status(200).json({ message: req.file.filename, program_id, chapter_num });
});

app.use("/api/v1", router);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/programs", programsRouter);

app.listen(8000, () => {
  console.log("Server started at port 8000");
});

exports.default = app