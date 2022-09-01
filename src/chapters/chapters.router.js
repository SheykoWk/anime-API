const router = require("express").Router();
const chaptersHttp = require("./chapters.http");

const { updateChapter } = require("../utils/multer");

router
  .route("/:program_id/chapters")
  .get(chaptersHttp.getByProgram)
  .post(updateChapter().single("chapter"), chaptersHttp.create);

router
  .route("/:program_id/chapters/:chapter_id")
  .get(chaptersHttp.getById)
  .put(updateChapter().single("chapter"), chaptersHttp.edit)
  .delete(chaptersHttp.remove);

module.exports = {
  router,
};
