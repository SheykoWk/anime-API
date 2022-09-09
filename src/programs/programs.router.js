const router = require('express').Router()
const multer  = require('../utils/multer')

const programServices = require('./programs.http')
const chapterServices = require('../chapters/chapters.http')

router.route('/')
    .get(programServices.getAll)
    .post( multer.updateCover().single('cover_img'), programServices.create)

router.route('/:program_id')
    .get(programServices.getById)
    .post(multer.updateCover().single('cover_img'), programServices.edit)
    .delete(programServices.remove)

router.route('/:program_id/chapters')
    .get(chapterServices.getAll)
    .post(multer.updateChapter().single('chapter_video'), chapterServices.register)

router.route('/:program_id/chapters/:chapter_id')
    .get(chapterServices.getById)
    .put(multer.updateChapter().single('chapter_video'), chapterServices.edit)
    .delete(chapterServices.remove)


exports.router = router