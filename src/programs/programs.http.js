const programControllers=require('./programs.controller')

//C.1:OBTENER TODOS LOS PROGRAMAS


const getAll=(req,res)=>{{
    const data=programControllers.getAllPrograms()
    res.status(200).json({items:data.length,programs:data})

}}

module.exports={
    getAll
}