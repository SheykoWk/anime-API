const router = require("express").Router();

const chaptersServices = require("./chapters.http");

router
  .route("/:programs:id/chapters")
  .get(chaptersServices.getAllChaptersByPro);

router.route("/:id").get(chaptersServices.getAllChapterById);

exports.router = router;
