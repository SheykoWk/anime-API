const uuid = require("uuid");

const chaptersDB = require("./chaptersDB");

const getChaptersByProgram = (programID) => {
  const data = chaptersDB.filter((chapter) => chapter.program_id === programID);
  if(data.length == 0){
    return false
  }
  return data;
};

const getChapterById = (id) => {
  const data = chaptersDB.filter((chapter) => chapter.id === id);
  if(data.length === 0){
    return false
  }
  return data[0];
};

const createChapter = (data, program_id, url) => {
  const newChapter = {
    id: uuid.v4(),
    program_id,
    chapter_num: data.chapter_num,
    url: url,
  };
  chaptersDB.push(newChapter);
  return newChapter;
};

const deleteChapter = (id) => {
  const index = chaptersDB.findIndex(chapter => chapter.id === id);
  if (index !== -1) {
    chaptersDB.splice(index, 1);
    return true;
  }
  return false;
};

const editChapter = (id, data, url) => {
  const index = chaptersDB.findIndex((chapter) => chapter.id === id);
  const editedChapter = {
    id: id,
    program_id: data.program_id ? data.program_id : chaptersDB[index].program_id,
    chapter_num: data.chapter_num ? data.chapter_num : chaptersDB[index].chapter_num,
    url: url ? url : chaptersDB[index].url,
  };
  if(index !== -1){
    chaptersDB[index] = editedChapter
    return chaptersDB[index]
  }
  return false
};



module.exports = {
  getChaptersByProgram,
  getChapterById,
  createChapter,
  editChapter,
  deleteChapter
}


