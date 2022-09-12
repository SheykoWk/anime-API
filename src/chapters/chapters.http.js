const chapterControllers=require('./chapters.controllers')
const programControllers=require('../programs/programs.controller')

//C.1:OBTENER TODOS LOS CAPITULOS
const getAll=(req,res)=>{{
    const data=chapterControllers.getAllChapters()
    res.status(200).json({items:data.length,chapters:data})

}}

//c.3:obtener todos los capitulos del programa
const getChaptersofPrograms=(req,res)=>{
    const programID=req.params.id
    const data=chapterControllers.getChaptersByProgram(programID)
    const dataProgram=programControllers.getProgramById(programID)
    if (data) {
        res.status(200).json({ items: data.length,programa:dataProgram, capitulos: data });
      } else {
        res.status(404).json({ message: `El id del programa es incorrecto o no tiene capitulos` });
      }
}

//C.3.B:AREGAR CAPITULOS AL PROGRAMA
// {
//     "chapter_num": 5,
//     "url": "url_to_img"
//   }

const  registerChapter=(req,res)=>{
    const data=req.body
    const program_id=req.params.id

     if (
        !data.chapter_num ||
        !data.url
      ) {
        return res.status(400).json({
          message: "Todos los campos deben de estar llenos ",
          fields: {
            chapter_num: "num",
            url: "url_to_img"
          },
        });
      } else {
        const response = chapterControllers.createChapter(data,program_id);
        return res.status(201).json({
          message: `Capitulo creado `,
          program: response,
        });
      }


}


//C.4.A:OBTENER UN CAPITULO ESPECIFICO
const getChapterByIdOfProgram=(req,res)=>{
    const id=req.params.chapter_id
    const program_id=req.params.id
    const dataProgram=programControllers.getProgramById(program_id)
    const data=chapterControllers.getChapterById(program_id,id)
    if (data) {
        res.status(200).json({ programa:dataProgram, capitulo: data });
      } else {
        res.status(404).json({ message: `El id del programa es incorrecto o no tiene capitulos` });
      }
}



module.exports={
    getAll,
    getChaptersofPrograms,
    registerChapter,
    getChapterByIdOfProgram
}

