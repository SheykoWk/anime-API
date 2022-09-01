//Dependencies
const router = require('express').Router();
//Services
const programsServices =require('./programs.http');


router.route('/')
  .get(programsServices.getAll)
  .post(programsServices.addAProgram)


router.route('/:programId/chapters')
  .get(programsServices.getChaptersByProgramId)
  .post(programsServices.addChapterToProgramById)
  

router.route('/:programId')
  .get(programsServices.getById)
  .delete(programsServices.remove)
  .put(programsServices.edit)

exports.router = router;
