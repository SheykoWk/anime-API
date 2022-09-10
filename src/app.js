//* Dependencias
const express = require("express");
const passport = require("passport");
const multer = require("multer")
require("./middleware/auth.middleware")(passport);
const path = require ('path')

//*Archivos de rutas
const userRouter = require("./users/users.router").router;
const authRouter = require("./auth/auth.router").router;
const programsRouter = require("./programs/programs.router").router;

//* Configuraciones iniciales
const app = express();
const upload = multer({dest: 'uploads/'})

//? Esta configuracion es para habilitar el req.body
app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json({ message: "All ok!" });
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.post("/", (req, res) => {
  res.status(200).json({ message: "All ok!" })
})

app.post("/upload", upload.single('image'), (req, res) => {
  res.status(200).json(req.file)
})

app.get("/api/v1/uploads/:file", (req, res) => {
  const image = req.params.file;
  res.status(200).sendFile(path.resolve('uploads/covers') + '/' + image)})

app.get("/api/v1/uploads/:file", (req, res) => {
  const chapImg = req.params.file;
  res.status(200).sendFile(path.resolve('uploads/chapters') + '/' + chapImg)
})

app.use("/api/v1/programs", programsRouter)
/* app.use("/api/v1/programs/:program_id", programsRouter)
app.use("/api/v1/programs/:program_id/chapters", programsRouter) */

app.listen(8000, () => {
  console.log("Server started at port 8000");
});

exports.default = app
exports.app = app
module.exports = app