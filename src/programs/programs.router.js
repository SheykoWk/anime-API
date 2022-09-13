const router = require('express').Router();
const programsServices = require('./programs.http');
const chaptersServices = require('./../chapters/chapters.http');
const { uploadCovers, uploadChapters } = require('../utils/multer');

router.route("/")
    .get(programsServices.getAll)
    .post(uploadCovers.single('cover_img'), programsServices.create);

router.route("/:id")
    .get(programsServices.getOne)
    .put(uploadCovers.single('cover_img'), programsServices.edit)
    .delete(programsServices.remove);

router.route("/:program_id/chapters")
    .get(chaptersServices.getChapters)
    .post(uploadChapters.single('chapter_video'), chaptersServices.create);

router.route("/:program_id/chapters/:chapter_id")
    .get(chaptersServices.getOne)
    .put(uploadChapters.single(), chaptersServices.edit)
    .delete(chaptersServices.remove);

exports.router = router;