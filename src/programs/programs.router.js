const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
const { updateChapter, updateCover } = require('../utils/multer')
require('../middleware/auth.middleware')(passport)
 
const ProgramServices = require('./programs.http')
const chapterServices = require('../chapters/chapters.http')

router.route('/')
    .get(
        passport.authenticate('jwt', {session: false}),
        ProgramServices.getPrograms
    )
    .post(
        passport.authenticate('jwt', {session: false}),
        roleAdminMiddleware,
        ProgramServices.createProgram
    )

router.route('/:program_id')
    .get(
        passport.authenticate('jwt', {session: false}),
        ProgramServices.getProgramById
    )
    .put(
        passport.authenticate('jwt', {session: false}),
        passport.authenticate('jwt', {session: false}),
        ProgramServices.edit
    )
    .delete(
        passport.authenticate('jwt', {session: false}),
        roleAdminMiddleware,
        ProgramServices.remove
    )

router.route('/:program_id/cover')
    .post(
        passport.authenticate('jwt', {session: false}),
        roleAdminMiddleware,
        updateCover().single('program-cover'),
        ProgramServices.postCover
    )

router.route('/:program_id/chapters')
    .get(
        passport.authenticate('jwt', {session: false}),
        chapterServices.getAll
    )
    .post(
        passport.authenticate('jwt', {session: false}),
        roleAdminMiddleware,
        updateChapter().single('chapter'),
        chapterServices.newChapter
    )

router.route('/:program_id/chapters/:chapter_id')
    .get(
        passport.authenticate('jwt', {session: false}),
        chapterServices.getById
    )
    .put(
        passport.authenticate('jwt', {session: false}),
        roleAdminMiddleware,
        chapterServices.edit
    )
    .delete(
        passport.authenticate('jwt', {session: false}),
        roleAdminMiddleware,
        chapterServices.remove
    )

exports.router = router