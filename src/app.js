//* Dependencias
const express = require("express");
const passport = require("passport");
const path = require("path");
const fs = require("fs");

require("./middleware/auth.middleware")(passport);

//* Configuraciones iniciales
const app = express();

//*Archivos de rutas
const userRouter = require("./users/users.router").router;
const authRouter = require("./auth/auth.router").router;
const progmsRouter = require("./programs/programs.router").router;

//? Esta configuracion es para habilitar el req.body
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "All ok!" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/programs", progmsRouter);

app.get("/uploads/animes/:cover_name", (req, res) => {
  const coverName = req.params.cover_name;
  const pathCover = path.join(__dirname, '../media/covers', coverName)
  
  if(!fs.existsSync(pathCover)){
    res.status(400).json({message: 'There is no image with this name.'})
  }else{
    res.status(200).sendFile(pathCover);
  }

} )

app.get("/uploads/anime/chapters/:ulr_mp", (req, res) => {
  const urlName = req.params.ulr_mp;
  const urlPath = path.join(__dirname, '../media/chapters', urlName);

  if(!fs.existsSync(urlPath)){
    res.status(400).json({message: 'There is no chapter with this name'})
  }else{
    res.status(200).sendFile(urlPath)
  }
})

app.listen(8000, () => {
  console.log("Server started at port 8000");
});

exports.default = app
exports.app = app
module.exports = app