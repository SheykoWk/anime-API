//* Dependencias
const express = require("express");
const passport = require("passport");
require("./middleware/auth.middleware")(passport);


//*Archivos de rutas
const userRouter = require("./users/users.router").router;
const authRouter = require("./auth/auth.router").router;
const programsRouter = require('./programs/programs.router').router
const chapterRouter = require('./chapters/chapters.router').router
const path = require('path')
//* Configuraciones iniciales
const app = express();

//? Esta configuracion es para habilitar el req.body
app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json({ message: "All ok!" });
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use('/api/v1/programs', programsRouter)
app.use('/api/v1/programs/', chapterRouter)
app.get('/uploads/anime/chapters/:chapterName', (req, res) => {
  const chapterName = req.params.chapterName
  res.status(200).sendFile(path.resolve('uploads/anime/chapters') + `/${chapterName}`)
})
app.get('/uploads/animes/:coverName', (req, res) => {
  const coverName = req.params.coverName
  res.status(200).sendFile(path.resolve('uploads/animes/') + `/${coverName}`)
})



app.listen(8000, () => {
  console.log("Server started at port 8000");
});

exports.default = app
exports.app = app
module.exports = app