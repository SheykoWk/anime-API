const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
const { updateChapter } = require('../utils/multer')
require('../middleware/auth.middleware')(passport)

const chapterServices = require('./chapters.http')


router.route('/')
    .get(
        passport.authenticate('jwt', {session: false}),
        chapterServices.getAll()
    )
    .post(
        passport.authenticate('jwt', {session: false}),
        roleAdminMiddleware,
        updateChapter().single('chapter'),
        chapterServices.newChapter()
    )

router.route('/:chapter_id')
    .get(
        passport.authenticate('jwt', {session: false}),
        chapterServices.getById()
    )
    .put(
        passport.authenticate('jwt', {session: false}),
        roleAdminMiddleware,
        chapterServices.edit()
    )
    .delete(
        passport.authenticate('jwt', {session: false}),
        roleAdminMiddleware,
        chapterServices.remove()
    )

    exports.router = router