const router = require('express').Router()
const { upload } = require('../utils/multer')
//const { upload } = require('../utils/multer')
const programServices = require('./programs.http')


router.route('/') 
    .get(programServices.getAll)
    .post(programServices.CreateProgram)

router.route('/:program_id')
    .delete(programServices.deleteProgram)
    .get(programServices.getById)
    
router.route('/:program_id/front-page')
    .post(upload.single("front-page"),programServices.postFrontPagaeProgram)
    
    
    




exports.router = router

