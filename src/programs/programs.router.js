const router = require("express").Router();

const { updateCover } = require("../utils/multer");
const programServices = require("./programs.http");

router.route("/")
    .get(programServices.getAll)
    .post(updateCover().single('cover'), programServices.create)

router.route("/:program_id")
    .get(programServices.getById)
    .put(updateCover().single('cover'), programServices.edit)
    .delete(programServices.remove)

exports.router = router