const router = require('express').Router()
const {updateCover, updateChapter } = require('../utils/multer')

const programsServices = require('./programs.http')
const chapterServices = require('../chapters/chapters.http')


router.route('/')
    .get(programsServices.getAllMyPrograms)
    .post(updateCover().single('program-cover'), programsServices.registerMyPrograms)

router.route('/:id')
    .get(programsServices.getMyProgramsById)
    .put(programsServices.editMyPrograms)
    .delete(programsServices.removeMyPrograms)

    router.route('/:programs_id/chapters')
    .get(chapterServices.getAllChaptersByProgram)
    .post(updateChapter().single('program-chapters'), chapterServices.registerChapters)

router.route('/:programs_id/chapters/:chapters_id')
    .get(chapterServices.getChapterById)
    .put(chapterServices.editChapter)
    .delete(chapterServices.removeChapter)

exports.router = router