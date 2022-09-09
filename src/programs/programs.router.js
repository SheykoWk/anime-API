const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
const {updateCover} = require('../utils/multer')
require('../middleware/auth.middleware')(passport)

const programsServices = require('./programs.http')


router.route('/')
    .get(programsServices.getAll)
    .post(programsServices.register)

router.route('/:program_id')
    .get(programsServices.getById)
    .post(updateCover().single('covers'), programsServices.postCoverPrograms)
    .put(programsServices.edit)
    .delete(programsServices.remove)

    
exports.router = router