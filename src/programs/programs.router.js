const router = require('express').Router()
const {updateCover, updateChapter } = require('../utils/multer')

const programsServices = require('./programs.http')
const chapterServices = require('../chapters/chapters.http')


router.route('/')
    .get(programsServices.getAllPrograms)
    .post(updateCover().single('cover'), programsServices.registerPrograms)

router.route('/:id')
    .get(programsServices.getProgramsById)
    .put(programsServices.editPrograms)
    .delete(programsServices.removePrograms)

    router.route('/:programs_id/chapters')
    .get(chapterServices.getAllChaptersByProgram)
    .post(updateChapter().single('program-chapters'), chapterServices.registerChapters)

router.route('/:programs_id/chapters/:chapters_id')
    .get(chapterServices.getChapterById)
    .put(chapterServices.editChapter)
    .delete(chapterServices.removeChapter)

exports.router = router