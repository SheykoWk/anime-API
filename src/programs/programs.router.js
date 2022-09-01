const router = require('express').Router()
const passport = require('passport')
require('../middleware/auth.middleware')(passport)

const programServices = require('./programs.http')

router.route('/')
  .get(programServices.getAll)
  .post(programServices.register)

exports.router = router
