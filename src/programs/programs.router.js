const router = require('express').Router()
const passport = require('passport')
require('../middleware/auth.middleware')(passport)
const { updateCover, updateChapter } = require('../utils/multer')
const programServices = require('./programs.http')

router.route('/')
  .get(programServices.getAll)
  .post(programServices.register)

router.route('/:id')
  .get(programServices.getById)
  .put(programServices.edit)
  .delete(programServices.remove)
  .patch(updateCover().single('cover'), programServices.postCoverImg)

router.route('/:id/chapters')
  .get(programServices.getChapter)
  .post(programServices.registerChapter)


router.route('/:idProgram/chapters/:idChapter')
  .get(programServices.getIdChaptersByIdProgram)
  .patch(updateChapter().single('chapter'), programServices.postChapterVideo)


exports.router = router
