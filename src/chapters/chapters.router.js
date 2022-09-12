const router = require('express').Router()

const chapterServices=require('./chapters.http')


router.route('/')
.get(chapterServices.getAll)



exports.router=router
