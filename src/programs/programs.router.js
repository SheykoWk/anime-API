//Dependencies
const router = require('express').Router();
//Services
const programsServices = require('./programs.http');
//Multer
const { uploadChapter, uploadCoverProgram } = require('../utils/multer');

router.route('/')
  .get(programsServices.getAll)
  .post(programsServices.addAProgram);

router.route('/:programId/chapters/:chapterId')
  .get(programsServices.getAChapterByProgram)
  .delete(programsServices.removeAChapterByProgram)
  .put(uploadChapter().single('chapter'), programsServices.editAChapterByProgramId);

router.route('/:programId/chapters')
  .get(programsServices.getChaptersByProgramId)
  .post(uploadChapter().single('chapter'), programsServices.addChapterToProgramById)

router.route('/:programId')
  .get(programsServices.getById)
  .delete(programsServices.remove)
  .put(programsServices.edit)
  .patch(uploadCoverProgram().single('cover'), programsServices.uploadCoverProgam);

exports.router = router;
