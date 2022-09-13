const uuid = require("uuid");

const chaptersDB = require("./chaptersDB");
const programsControl=require('../programs/programs.controller')

//C.1:OBTENER TODOS LOS CAPITULOS
const getAllChapters=()=>{
  return chaptersDB
}

//c.3.A:obtener todos los capitulos del programa
const getChaptersByProgram = (programID) => {
  const data = chaptersDB.filter((chapter) => chapter.program_id === programID);
  // return data;
  return  data.length ? data : false
};

//C.3.B:AREGAR CAPITULOS AL PROGRAMA
const createChapter = (data, program_id) => {

const dataProgram=programsControl.getProgramById(program_id)

if(dataProgram){
  const newChapter = {
    id: uuid.v4(),
    // program_id,
    program_id:program_id,
    chapter_num: data.chapter_num,
    url: data.url,
  };
  chaptersDB.push(newChapter);
  return newChapter;
}
else{
  return null
}

};


//C.4.A:OBTENER UN CAPITULO ESPECIFICO
 const getChapterById_1 = (id) => {
   const data = chaptersDB.filter((chapter) => chapter.id === id);
   return  data.length ? data : false
 };

// const getChapterById = (program_id,id) => {
//   const dataProgram=getChaptersByProgram(program_id)
//   if(dataProgram){
//     const data = dataProgram.filter((chapter) => chapter.id === id);
//     return data
//   }
//   else{
//     return false
//   }

 
// };

const getChapterById = (program_id,id) => {
  const dataProgram=getChaptersByProgram(program_id)
  if(dataProgram){
    const data = dataProgram.filter((chapter) => chapter.id === id);
    return data
  }
  else{
    return false
  }
};





//C.4.C:EDITAR UN CAPITULO
// const editChapter = (id, data) => {
//   const index = chaptersDB.findIndex((chapter) => chapter.id === id);
//   const editedChapter = {
//     id: id,
//     program_id: data.program_id ? data.program_id : chaptersDB[index].program_id,
//     chapter_num: data.chapter_num ? data.chapter_num : chaptersDB[index].chapter_num,
//     url: data.url ? data.url : chaptersDB[index].url,
//   };
//   if(index !== -1){
//     chaptersDB[index] = editedChapter
//     return chaptersDB[index]
//   }
//   return false
// };

///corregirel  error si no existe elid
// const editChapter = (program_id,id, data) => {
//   const dataProgram=getChaptersByProgram(program_id)
  

//   const index = dataProgram.findIndex((chapter) => chapter.id === id);
//   const editedChapter = {
//     id: id,
//     program_id: data.program_id ? data.program_id : dataProgram[index].program_id,
//     chapter_num: data.chapter_num ? data.chapter_num : dataProgram[index].chapter_num,
//     url: data.url ? data.url : dataProgram[index].url,
//   };
//   if(index !== -1){
//     chaptersDB[index] = editedChapter
//     return chaptersDB[index]
//   }
//   else{
//     return false
//   }
// };

const editChapter = (program_id,id, data) => {
  const dataProgram=programsControl.getProgramById(program_id)
  const dataChapterId=getChapterById_1(id)
if(dataProgram&&dataChapterId){
  const index = chaptersDB.findIndex((chapter) => chapter.id === id);
  const editedChapter = {
   id: id,
   program_id: data.program_id ? data.program_id : chaptersDB[index].program_id,
   chapter_num: data.chapter_num ? data.chapter_num : chaptersDB[index].chapter_num,
   url: data.url ? data.url : chaptersDB[index].url,
 };
  if(index !== -1){
    chaptersDB[index] = editedChapter
   return chaptersDB[index]
  }
  return false
}
else{
  return false
}
   
   };


//C.4.D:ELIMINAR UNCAPITULO

// const deleteChapter = (id) => {
//   const index = chaptersDB.findIndex((chapter) => chapter.id === id);
//   if (index !== -1) {
//     chaptersDB.splice(index, 1);
//     return true;
//   }
//   return false;
// };

const deleteChapter = (program_id,id) => {

  const dataProgram=programsControl.getProgramById(program_id)
  if(dataProgram){
    const index = chaptersDB.findIndex((chapter) => chapter.id === id);
    if (index !== -1) {
      chaptersDB.splice(index, 1);
      return true;
    }
    return false;
  }
  else{
    return false
  }

 
};



//MULTER:POSTEAR UN CAPITULO
const editChapterURL = (id,chapterUrl) => {
  const dataChapterId=getChapterById_1(id)

  if(dataChapterId){
    const index = chaptersDB.findIndex(chapter => chapter.id === id)
    if(index !== -1){
      chaptersDB[index].url= chapterUrl
      return chaptersDB[index]
    }
    return false
  }
  else{
    return false
  }
 
}





module.exports={
  getAllChapters,
  getChaptersByProgram,
  createChapter,
  getChapterById,
  editChapter,
  deleteChapter,
  editChapterURL
}






