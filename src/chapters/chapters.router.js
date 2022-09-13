const router = require('express').Router()

const chapterServices=require('./chapters.http')
const {updateChapter}=require('../utils/multer')

router.route('/')
.get(chapterServices.getAll)


 //multer
 router.route('/:chapter_id/chapters')
.post(updateChapter().single('file_name'),chapterServices.postChapterURL)



exports.router=router
