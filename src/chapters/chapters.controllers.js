const uuid = require("uuid");

const chaptersDB = require("./chaptersDB");

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
  const newChapter = {
    id: uuid.v4(),
    // program_id,
    program_id:program_id,
    chapter_num: data.chapter_num,
    url: data.url,
  };
  chaptersDB.push(newChapter);
  return newChapter;
};


//C.4.A:OBTENER UN CAPITULO ESPECIFICO
// const getChapterById = (id) => {
//   const data = chaptersDB.filter((chapter) => chapter.id === id);
//   return data;
// };

const getChapterById = (program_id,id) => {
  const dataProgram=getChaptersByProgram(program_id)
  const data = dataProgram.filter((chapter) => chapter.id === id);
  return data;
};


const deleteChapter = (id) => {
  const index = chaptersDB.findIndex((chapter) => chapter.id === id);
  if (index !== -1) {
    chaptersDB.slice(index, 1);
    return true;
  }
  return false;
};

const editChapter = (id, data) => {
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
};


module.exports={
  getAllChapters,
  getChaptersByProgram,
  createChapter,
  getChapterById
}






