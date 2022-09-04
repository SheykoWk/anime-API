const router = require("express").Router();
const passport = require("passport");

const chapterServices = require("./chapters.http");
require("../middleware/auth.middleware")(passport);
const { roleAdminMiddleware } = require("../middleware/adminRole");
const { updateChapter } = require("../utils/multer");

router
    .route("/:program_id/chapters")
    .get(chapterServices.getByProgram)
    .post(
        passport.authenticate("jwt", { session: false }),
        roleAdminMiddleware,
        chapterServices.add
    );

router
    .route("/:program_id/chapters/:chapter_id")
    .get(chapterServices.getById)
    .put(
        passport.authenticate("jwt", { session: false }),
        roleAdminMiddleware,
        chapterServices.edit
    )
    .delete(
        passport.authenticate("jwt", { session: false }),
        roleAdminMiddleware,
        chapterServices.remove
    );

router.post(
    "/:program_id/chapters/:chapter_id/chapter-video",
    passport.authenticate("jwt", { session: false }),
    roleAdminMiddleware,
    updateChapter().single("chapter_video"), //! Si el Id es inválido, igual se crea el archivo en disco!!
    chapterServices.editMedia
);

exports.router = router;
