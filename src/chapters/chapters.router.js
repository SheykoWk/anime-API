const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
const { updateChapters } = require('../utils/multer')
require('../middleware/auth.middleware')(passport)

const chaptersServices = require('./chapters.http')

router.route('/:program_id/chapters')
    .get(chaptersServices.getChapter)
    .post(chaptersServices.register)

router.route('/:program_id/chapters/:chapter_id')
    .get(chaptersServices.getById)
    .delete(chaptersServices.remove)
    .put(chaptersServices.edit)
    .post(updateChapters().single('chapter'), chaptersServices.postChapter)





exports.router = router