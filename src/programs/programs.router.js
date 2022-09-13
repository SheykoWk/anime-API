const router=require('express').Router()
const multer = require('multer')
const programServices=require('./programs.http')
const chaptersServices=require('../chapters/chapters.http')
const { updateCover } = require('../utils/multer')


//1  
router.route('/')
    .get(programServices.getAll)
    .post(programServices.create)

//2
router.route('/:program_id')
.get(programServices.getById)
.put(programServices.edit)
.delete(programServices.remove)




//3
router.route('/:program_id/chapters')
.get(chaptersServices.getChaptersofPrograms)
.post(chaptersServices.registerChapter)



//4
router.route('/:program_id/chapters/:chapter_id')
.get(chaptersServices.getChapterByIdOfProgram)
.put(chaptersServices.editByIdOfProgram)
.delete(chaptersServices.removechapter)




    //multer
 router.route('/:program_id/covers')
.post(updateCover().single('file_name'),programServices.postProgramCover)



    exports.router=router


