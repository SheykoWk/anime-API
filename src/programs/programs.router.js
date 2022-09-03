const router = require('express').Router()
const multer = require('../utils/multer')
const passport = require('passport')
const programServices = require('./programs.http')
const chapterServices = require('../chapters/chapters.http')



router.route('/')
    .get(passport.authenticate('jwt',{session: false}),programServices.getAll)
    .post(passport.authenticate('jwt',{session: false}),multer.updateCover().single('image'),programServices.register)

router.route('/:programs_id')
    .get(passport.authenticate('jwt',{session: false}),programServices.getById)
    .delete(passport.authenticate('jwt',{session: false}),programServices.removePrograms)
    .put(passport.authenticate('jwt',{session: false}),programServices.editProgram)

router.route('/:programs_id/chapters')
    .get(passport.authenticate('jwt',{session: false}),chapterServices.getChaptersByProgram)
    .post(passport.authenticate('jwt',{session: false}),multer.updateChapter().single('video'),chapterServices.register)

router.route('/:programs_id/chapters/:chapters_id')
    .get(passport.authenticate('jwt',{session: false}),chapterServices.getChapterById)
    .put(passport.authenticate('jwt',{session: false}),chapterServices.editChapter)
    .delete(passport.authenticate('jwt',{session: false}),chapterServices.remove)







    exports.router = router