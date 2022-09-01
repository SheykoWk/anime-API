//* Dependencias
const express = require("express");
const passport = require("passport");
require("./middleware/auth.middleware")(passport);

//*Archivos de rutas
const userRouter = require("./users/users.router").router;
const authRouter = require("./auth/auth.router").router;
const programRouter = require("./programs/programs.router").router;
const chapterRouter = require("./chapters/chapters.router").router;

//* Configuraciones iniciales
const app = express();

//? Esta configuracion es para habilitar el req.body
app.use(express.json(), express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.status(200).json({ message: "All ok!" });
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/programs", chapterRouter)

app.use("/api/v1/uploads/media/chapters", (req, res) => {})

app.listen(8000, () => {
  console.log("Server started at port 8000");
});

exports.default = app;
exports.app = app;
module.exports = app;
