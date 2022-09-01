const router = require('express').Router()
const passport = require('passport')
require('../middleware/auth.middleware')(passport)

const programServices = require('./programs.http')

router.route('/')
  .get(programServices.getAll)
  .post(programServices.register)

router.route('/:id')
  .get(programServices.getById)
  .put(programServices.edit)
  .delete(programServices.remove)



exports.router = router
