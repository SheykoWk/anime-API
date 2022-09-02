const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
const { updateCover, updateChapter } = require("../utils/multer")
require('../middleware/auth.middleware')(passport)

const userServices = require('./users.http')


router.route('/') //* /api/v1/users/
    .get(userServices.getAll)


router.route('/me')
    .put(passport.authenticate('jwt', {session: false}) ,userServices.editMyUser)
    .get(passport.authenticate('jwt', {session: false}), userServices.getMyUser)
    .delete(passport.authenticate('jwt', {session: false}), userServices.removeMyUser)

router.route('/media/covers')
    .post(passport.authenticate('jwt', {session: false}), updateCover.single(`profile_img`), userServices.postProfileImg)
    //.get()

router.route('/media/chapters')
    .post(passport.authenticate('jwt', {session: false}), updateChapter.single(`profile_img`), userServices.postProfileImg2)
    //.get()

router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}),userServices.getById)
    .delete(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, userServices.remove)
    .put(passport.authenticate('jwt', {session: false}), roleAdminMiddleware ,userServices.edit)


exports.router = router