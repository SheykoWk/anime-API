const uuid = require("uuid");
/* const DB = require('../programs/programs.controller') */

const chaptersDB = require("./chaptersDB");

const getChaptersByProgram = (programID) => {
  const data = chaptersDB.filter((chapter) => chapter.program_id === programID);
  return data;
};

const getChapterById = (id) => {
  const data = chaptersDB.filter((chapter) => chapter.id === id);
  return data[0];
};

const createChapter = (data) => {
  const newChapter = {
    id: uuid.v4(),
    program_id: data.program_id,
    chapter_num: data.chapter_num,
    url: data.url,
  };
  chaptersDB.push(newChapter);
  return newChapter;
};

const deleteChapter = (id) => {
  const index = chaptersDB.findIndex((chapter) => chapter.program_id === id);
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

const editChapterImg = (urlFile, chapterID) => {
  const index = chaptersDB.findIndex(chapter => chapter.id === chapterID)
  if (index !== -1) {
    chaptersDB[index].url = urlFile;
    return chaptersDB[index];
  }
  return false;
}


module.exports = {
  getChaptersByProgram,
  getChapterById,
  createChapter,
  deleteChapter,
  editChapter,
  editChapterImg
}




