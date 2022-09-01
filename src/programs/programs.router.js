const router = require('express').Router()
const multer = require('../utils/multer')

const programServices = require('./programs.http')
const chapterServices = require('../chapters/chapters.http')



router.route('/')
    .get(programServices.getAll)
    .post(programServices.register)

router.route('/:programs_id')
    .get(programServices.getById)
    .delete(programServices.removePrograms)
    .put(programServices.editProgram)

router.route('/:programs_id/chapters')
    .get(chapterServices.getChaptersByProgram)
    .post(chapterServices.register)

router.route('/:programs_id/chapters/:chapters_id')
    .get(chapterServices.getChapterById)
    .put(chapterServices.editChapter)
    .delete(chapterServices.remove)




    exports.router = router