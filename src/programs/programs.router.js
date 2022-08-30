const router = require("express").Router();

const programServices = require("./programs.http");

router.route("/")
    .get(programServices.getAll)
    .post(programServices.create)

router.route("/:id")
    .get(programServices.getById)
    .put(programServices.edit)
    .delete(programServices.remove)

exports.router = router