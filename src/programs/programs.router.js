const router = require('express').Router()
const passport = require('passport');
const { roleAdminMiddleware } = require('../middleware/adminRole');
require('../middleware/auth.middleware')(passport);

const chaptersServices = require('../chapters/chapters.http');
const programsServices = require('./programs.http');

router.route('/') //* /api/v1/programs
    .get(programsServices.getAll)
    .post(programsServices.create)

router.route('/:id') //* /api/v1/programs/:program_id
    .get(programsServices.getById)
    .delete(programsServices.remove)
    .put(programsServices.edit)

router.route('/:id/chapters') //* /api/v1/programs/:program_id/chapters
    .get(chaptersServices.getAllChaps)
    .post(chaptersServices.createChap)

router.route('/:id/chapters/:chapter_id') //* /api/v1/programs/:program_id/chapters/:chapter_id
    .get(chaptersServices.getChapById)
    .delete(chaptersServices.removeChap)
    .put(chaptersServices.editChap)
    
exports.router = router