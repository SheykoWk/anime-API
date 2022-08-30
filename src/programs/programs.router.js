//Dependencies
const router = require('express').Router();
//Services
const programsServices =require('./programs.http');

router.route('/')
  .get(programsServices.getAll)
  .post(programsServices.addAProgram)

exports.router = router;
