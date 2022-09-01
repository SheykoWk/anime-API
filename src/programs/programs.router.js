const router = require('express').Router()
const programsHttp = require('./programs.http')

const { updateCover } = require('../utils/multer')

router.route('/')
    .get(programsHttp.getAll)
    .post(updateCover().single("cover"), programsHttp.create)

router.route('/:program_id')
    .get(programsHttp.getById)
    .put(updateCover().single('cover'), programsHttp.edit)
    .delete(programsHttp.remove)


module.exports = {
    router
}