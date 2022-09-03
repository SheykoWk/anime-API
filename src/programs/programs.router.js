const router = require('express').Router()
const { updateCover, updateChapter }  = require('../utils/multer')

const progmsServices = require('./programs.http')
const chapterServices = require('../chapters/chapters.http')

router.route('/')
    .get(progmsServices.getAllProgms)
    .post(updateCover().single('cover_img'), progmsServices.createProgms,)

router.route('/:id')
    .get(progmsServices.getProgmsById)
    .put(progmsServices.editProgms)
    .delete(progmsServices.deleteProgms)

router.route('/:program_id/chapters')
    .get(chapterServices.getChapByProg)
    .post(updateChapter().single('url_mp'), chapterServices.createChap)

router.route('/:program_id/chapters/:chapter_id')
    .get(chapterServices.getChapById)
    .put(chapterServices.putChap)
    .delete(chapterServices.deleteChap)


exports.router = router;