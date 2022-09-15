const router = require('express').Router()
const passport = require('passport')
const {updateCover} = require('../utils/multer')
require('../middleware/auth.middleware')(passport)

const programServices = require('./programs.http')

router.route('/')
    .get(programServices.getAll)
    .post( programServices.create)

router.route('/:id')
    .get(programServices.getById)
    .put(programServices.edit)
    .delete(programServices.remove)

router.post('/:id/upload', updateCover().single('cover'), programServices.postProfileImg)

exports.router = router