const uuid = require("uuid");

const chaptersDB = require("./chaptersDB");
const programsDB = require('../programs/programs.controller').programsDB

const getChaptersByProgram = (programID) => {
  const data = chaptersDB.filter((chapter) => chapter.program_id === programID);
  const index = programsDB.filter(program => program.id === programID)

  index[0].chapters = data
  
  return index;
};

const getChapterById = (id) => {
  const data = chaptersDB.filter((chapter) => chapter.id === id);
  return data[0]? data[0] : null
  
};

const createChapter = (data, program_id) => {
  const newChapter = {
    id: uuid.v4(),
    program_id,
    chapter_num: data.chapter_num,
    url: data.url? data.url : '',
  };
  chaptersDB.push(newChapter);
  return newChapter;
};

const deleteChapter = (id) => {
  const index = chaptersDB.findIndex(item => item.id === id)

  if(index !== -1 ){
    chaptersDB.splice(index, 1)
    return true
  }
  return false
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

const postChapter = (id, chapterUrl)=>{
  const index = chaptersDB.findIndex(chapter => chapter.id === id)

  if(index !== -1){
    chaptersDB[index].url = chapterUrl
    return chaptersDB[index]
  }else{
    return false
  }
}

module.exports = {
  getChaptersByProgram,
  createChapter,
  getChapterById,
  deleteChapter,
  editChapter,
  postChapter
}




