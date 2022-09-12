const router = require("express").Router();

const { updateChapter } = require("../utils/multer");
const chapterServices = require("./chapters.http");

router.route("/:program_id/chapters")
    .get(chapterServices.getByProgram)
    .post(updateChapter().single('chapter'), chapterServices.create)

router.route("/:program_id/chapters/:chapter_id")
    .get(chapterServices.getById)
    .put(updateChapter().single('chapter'), chapterServices.edit)
    .delete(chapterServices.remove)

exports.router = router