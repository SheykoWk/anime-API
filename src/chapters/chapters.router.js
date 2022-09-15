const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
const {updateChapter, updateCover} = require('../utils/multer')
require('../middleware/auth.middleware')(passport)

const chapterServices = require('./chapters.http')

router.route('/:program_id/chapters')
    .get(chapterServices.getAllChapter)
    .post(chapterServices.create)

router.post('/:program_id/chapters/:chapter_id', updateChapter().single('chapter'), chapterServices.postProfileImg)

router.route('/:program_id/chapters/:chapter_id')
    .get(chapterServices.getChapterById)
    .delete(chapterServices.remove)
    .put(chapterServices.edit)

    

exports.router = router