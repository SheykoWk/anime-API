const router = require("express").Router()

const { route, get } = require("../app")
const useServices = require(`./programs.http`)
const chaptersServices = require(`../chapters/chapters.http`)

router.route(`/`)
    .get(useServices.getAll)
    .post(useServices.registerProgram)

router.route(`/:program_id`)
    .get(useServices.getById)
    .put(useServices.editProgram)
    .delete(useServices.remove)


router.route(`/:programs_id/chapters`)
    .get(chaptersServices.getAllC)
    .post(chaptersServices.registerChapter)

router.route(`/:programs_id/chapters/:chapter_id`)
    .get(chaptersServices.getChapterId)
    .put(chaptersServices.editChapterId)
    .delete(chaptersServices.removeChapter)
    

exports.router = router