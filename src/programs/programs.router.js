const router=require('express').Router()

const programServices=require('./programs.http')
const chaptersServices=require('../chapters/chapters.http')

//1  
router.route('/')
    .get(programServices.getAll)
    .post(programServices.create)

//2
router.route('/:id')
.get(programServices.getById)
.put(programServices.edit)
.delete(programServices.remove)


//3
router.route('/:id/chapters')
.get(chaptersServices.getChaptersofPrograms)
.post(chaptersServices.registerChapter)



//4
router.route('/:id/chapters/:chapter_id')
.get(chaptersServices.getChapterByIdOfProgram)

    exports.router=router