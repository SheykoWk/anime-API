const router=require('express').Router()

const programServices=require('./programs.http')


router.route('/')
    .get(programServices.getAll)


    exports.router=router