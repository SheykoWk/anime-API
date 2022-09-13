const chapterControllers=require('./chapters.controllers')
const programControllers=require('../programs/programs.controller')

//C.1:OBTENER TODOS LOS CAPITULOS
const getAll=(req,res)=>{{
    const data=chapterControllers.getAllChapters()
    res.status(200).json({items:data.length,chapters:data})

}}

//c.3:obtener todos los capitulos del programa
const getChaptersofPrograms=(req,res)=>{
    const programID=req.params.program_id
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
    const program_id=req.params.program_id
    const response = chapterControllers.createChapter(data,program_id);
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
      }
      else if(response){
        return res.status(201).json({
          message: `Capitulo creado `,
          program: response,
        });
      }
      else{
     return res.status(404).json({ message: `El id del programa es incorrecto ` });
      }


}


//C.4.A:OBTENER UN CAPITULO ESPECIFICO
// const getChapterByIdOfProgram=(req,res)=>{
//     const id=req.params.chapter_id
//     const program_id=req.params.program_id

//     const dataProgram=programControllers.getProgramById(program_id)

//     const data=chapterControllers.getChapterById(program_id,id)
//     if (data) {
//         res.status(200).json({ programa:dataProgram, capitulo: data });
//       } else {
//         res.status(404).json({ message: `El id del programa es incorrecto o no tiene capitulos` });
//       }
// }

const getChapterByIdOfProgram=(req,res)=>{
  const id=req.params.chapter_id
  const program_id=req.params.program_id

  const dataProgram=programControllers.getProgramById(program_id)
  
  const data=chapterControllers.getChapterById(program_id,id)
  if (data) {
      res.status(200).json({ programa:dataProgram, capitulo: data });
    } else {
      res.status(404).json({ message: `El id del programa es incorrecto o no tiene capitulos` });
    }
}



//C.4.C:EDITAR UN CAPITULO
const editByIdOfProgram=(req,res)=>{
  const program_id=req.params.program_id
    const id=req.params.chapter_id
    const data=req.body
   
     const dataProgram=programControllers.getProgramById(program_id)
   
     const response=chapterControllers.editChapter(program_id,id,data)
    // const response=chapterControllers.editChapter(id,data)
    if(response){
        return res.status(200).json({
            message: "Capitulo editado correctamente",
             programa:dataProgram,
            capitulo_edited: response
          });
    }else{
        return res.status(400).json({
           message:'Id ingresado no existe'
        })
    }
}


//C.4.D:ELIMINAR UNCAPITULO
const removechapter=(req,res)=>{
    const id=req.params.chapter_id
    const program_id=req.params.program_id
const data=chapterControllers.deleteChapter(program_id,id)
if (data) {
    return res.status(204).json();
  } else {
    return res.status(400).json({ message: "Id del capitulo invalido" });
  }

}


//MULTER:POSTEAR UN CAPITULO
const postChapterURL = (req, res) => {
    const id = req.params.chapter_id;
    const chapterUrl = req.hostname + ':8000' + '/api/v1/media/chapters/' + req.file.filename 
  
    const data = chapterControllers.editChapterURL(id,chapterUrl)
   
    if (data) {
      return res.status(200).json(data)
     } else {
       return res.status(400).json({ message: "Id del capitulo invalido" });
     }
  
  
  }


module.exports={
    getAll,
    getChaptersofPrograms,
    registerChapter,
    getChapterByIdOfProgram,
    editByIdOfProgram,
    removechapter,
    postChapterURL
}

