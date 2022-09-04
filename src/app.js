//* Dependencias
const path = require("path");
const express = require("express");
const passport = require("passport");
require("./middleware/auth.middleware")(passport);

//*Archivos de rutas
const config = require("./config");
const userRouter = require("./users/users.router").router;
const authRouter = require("./auth/auth.router").router;
const programRouter = require("./programs/programs.router").router;
const chapterRouter = require("./chapters/chapters.router").router;

//* Configuraciones iniciales
const app = express();

//? Esta configuracion es para habilitar el req.body
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/programs", chapterRouter);

app.use("/api/v1/uploads/profile_img/:imgName", (req, res) => {
    const imgName = req.params.imgName;
    res.status(200).sendFile(
        `${path.resolve("uploads/profile_img/")}/${imgName}`
    );
});

app.use("/api/v1/media/covers/:imgName", (req, res) => {
    const imgName = req.params.imgName;
    res.status(200).sendFile(`${path.resolve("media/covers/")}/${imgName}`);
});
app.use(
    "/api/v1/media/chapters/:vidName",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const vidName = req.params.vidName;
        res.status(200).sendFile(
            `${path.resolve("media/chapters/")}/${vidName}`
        );
    }
);

app.listen(config.port, () => {
    console.log(`Server "Kame House" started at port: ${config.port}`);
});

exports.default = app;
exports.app = app;
module.exports = app;
