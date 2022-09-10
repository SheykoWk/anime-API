const router = require('express').Router()
const passport = require('passport');
const { roleAdminMiddleware } = require('../middleware/adminRole');
require('../middleware/auth.middleware')(passport);

const { updateCover, updateChapter } = require('../utils/multer');

const chaptersServices = require('../chapters/chapters.http');
const programsServices = require('./programs.http');
/* const { post } = require('../app'); */

router.route('/') //* /api/v1/programs
    .get(programsServices.getAll)
    .post(programsServices.create)

router.route('/:id') //* /api/v1/programs/:program_id
    .get(programsServices.getById)
    .delete(programsServices.remove)
    .put(programsServices.edit)

router.route('/:id/cover')
    .post(updateCover().single('cover-img'), programsServices.addCover)

router.route('/:id/chapters') //* /api/v1/programs/:program_id/chapters
    .get(chaptersServices.getAllChaps)
    .post(chaptersServices.createChap)

router.route('/:id/chapters/:chapter_id') //* /api/v1/programs/:program_id/chapters/:chapter_id
    .get(chaptersServices.getChapById)
    .delete(chaptersServices.removeChap)
    .put(chaptersServices.editChap)

router.route('/:id/chapters/:chapter_id/chapterImg')    
    .post(updateChapter().single('chapter-img'), chaptersServices.addChapterImg)


    
exports.router = router