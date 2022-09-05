const router = require('express').Router()
const chaptersServices = require('./chapters.http')


router.route('/:program_id/chapters')
 .get(chaptersServices.getByIdProgram)
 .post(chaptersServices.getCreateChapter)


router.route('/:program_id/chapters/:chapter_id')
 .get(chaptersServices.getByIdchapter)
 .put(chaptersServices.getEditChapter)
 .delete(chaptersServices.getDeleteChapter)
    

exports.router = router