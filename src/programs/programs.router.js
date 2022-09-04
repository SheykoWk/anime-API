const router = require("express").Router();
const passport = require("passport");

const { roleAdminMiddleware } = require("../middleware/adminRole");
const programServices = require("./programs.http");
require("../middleware/auth.middleware")(passport);
const { updateCover } = require("../utils/multer");

router
    .route("/")
    .get(programServices.getAll)
    .post(
        passport.authenticate("jwt", { session: false }),
        roleAdminMiddleware,
        programServices.create
    );

router
    .route("/:program_id")
    .get(programServices.getById)
    .put(
        passport.authenticate("jwt", { session: false }),
        roleAdminMiddleware,
        programServices.edit
    )
    .delete(
        passport.authenticate("jwt", { session: false }),
        roleAdminMiddleware,
        programServices.remove
    );

router.post(
    "/:program_id/cover",
    passport.authenticate("jwt", { session: false }),
    roleAdminMiddleware,
    updateCover().single("program_img"),
    programServices.editCover
);
exports.router = router;
