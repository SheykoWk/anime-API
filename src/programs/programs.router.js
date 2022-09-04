const router = require('express').Router()
const  {updateChapter ,updateCover}  = require('../utils/multer')

const progmsServices = require('./programs.http')
const chapterServices = require('../chapters/chapters.http')

router.route('/')
    .get(progmsServices.getAllProgms)
    .post(progmsServices.createProgms,)

router.route('/:program_id')
    .post(updateCover().single('cover_img'), progmsServices.postImgCover)

// router.post('/programs/chapters/url-mp', updateChapter().single('url_mp'), chapterServices.postMpChap)

router.route('/:id')
    .get(progmsServices.getProgmsById)
    .put(progmsServices.editProgms)
    .delete(progmsServices.deleteProgms)

router.route('/:program_id/chapters')
    .get(chapterServices.getChapByProg)
    .post(chapterServices.createChap)

router.route('/:program_id/chapters/:chapter_id')
    .get(chapterServices.getChapById)
    .put(chapterServices.putChap)
    .delete(chapterServices.deleteChap)

exports.router = router;