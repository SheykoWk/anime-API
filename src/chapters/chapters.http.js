const chapterControllers=require('./chapters.controllers')

//C.1:OBTENER TODOS LOS CAPITULOS
const getAll=(req,res)=>{{
    const data=chapterControllers.getAllChapters()
    res.status(200).json({items:data.length,chapters:data})

}}

module.exports={
    getAll
}

