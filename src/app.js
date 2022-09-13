//* Dependencias
const express = require("express");
const passport = require("passport");
require("./middleware/auth.middleware")(passport);
const path=require('path')

//*Archivos de rutas
const userRouter = require("./users/users.router").router;
const authRouter = require("./auth/auth.router").router;
const chapterRouter=require('./chapters/chapters.router').router
const programRouter=require('./programs/programs.router').router

//* Configuraciones iniciales
const app = express();

//? Esta configuracion es para habilitar el req.body
app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json({ message: "All ok!" });
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use('/api/v1/chapters',chapterRouter)
app.use('/api/v1/programs',programRouter)


app.get('/api/v1/media/cover/:imgName',(req,res)=>{
  const imgName=req.params.imgName
  res.status(200).sendFile(path.resolve('uploads/covers/')+'/'+imgName)
})


app.get('/api/v1/media/chapters/:imgName',(req,res)=>{
  const imgName=req.params.imgName
  res.status(200).sendFile(path.resolve('uploads/chapters/')+'/'+imgName)
})


app.listen(8000, () => {
  console.log("Server started at port 8000");
});

exports.default = app
exports.app = app
module.exports = app