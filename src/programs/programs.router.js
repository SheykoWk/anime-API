const router = require("express").Router();
const { uploadCovers } = require("../utils/multer");

const programsServices = require("./programs.http");
const chaptersServices = require("../chapters/chapters.http");

router
  .route("/") //* /api/v1/programs/
  .get(programsServices.getAllPro)
  .post(programsServices.registerPro);

router
  .route("/media/covers/cover-img")
  .post(uploadCovers.single("cover-img"), programsServices.programImgCover);
//.get()

router
  .route("/:id")
  .get(programsServices.getProById)
  .delete(programsServices.removePro)
  .put(programsServices.editPro);

router
  .route("/:program_id/chapters")
  .get(chaptersServices.getAllChaptersByPro)
  .post(chaptersServices.register);

router
  .route("/:program_id/chapters/:chapter_id")
  .get(chaptersServices.getAllChapterById)
  .put(chaptersServices.edit)
  .delete(chaptersServices.remove);

exports.router = router;
