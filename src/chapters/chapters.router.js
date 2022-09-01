const router = require('express').Router()
const passport = require('passport');
const { roleAdminMiddleware } = require('../middleware/adminRole');
require('../middleware/auth.middleware')(passport);

const chaptersServices = require('./chapters.http');

router.route('/') //* /api/v1/programs
    .get(chaptersServices.getAllChaps)

    exports.router = router