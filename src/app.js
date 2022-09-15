//* Dependencias
const express = require("express");
const passport = require("passport");
require("./middleware/auth.middleware")(passport);
const path = require('path')

//*Archivos de rutas
const userRouter = require("./users/users.router").router;
const authRouter = require("./auth/auth.router").router;

const programRouter = require('./programs/programs.router').router
const chapterRouter = require('./chapters/chapters.router').router

//* Configuraciones iniciales
const app = express();

//? Esta configuracion es para habilitar el req.body
app.use(express.json());
//  localhost:8000/uploads/anime/chapters/1663273770134-peakpx (1).jpg
app.get('/uploads/animes/:img', (req, res) => {
    const url = req.params.img
    res.status(200).sendFile(path.resolve('uploads/') +'/media/covers/' + url)
})

app.get('/uploads/animes/chapters/:img', (req, res) => {
  const url = req.params.img
  res.status(200).sendFile(path.resolve('uploads/') +'/media/chapters/' + url)
})


app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/programs", chapterRouter)
app.use("/api/v1/programs", programRouter);

app.listen(8000, () => {
  console.log("Server started at port 8000");
});


exports.default = app
exports.app = app
module.exports = app