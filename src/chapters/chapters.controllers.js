const uuid = require("uuid");

const chaptersDB = require("./chaptersDB");
const {programsDB} = require("../programs/programs.controller")

const getChaptersByProgram = (programID,id) => {
  const datap = programsDB.filter((program) => program.id === id);
  const data = chaptersDB.filter((chapter) => chapter.program_id === programID);
  const obj = Object.assign(data, datap)
  return obj;
};

const getChapterById = (id) => {
  const data = chaptersDB.filter((chapter) => chapter.id === id);
  return data;
};

const createChapter = (data, program_id) => {
  const newChapter = {
    id: uuid.v4(),
    program_id: program_id,
    chapter_num: data.chapter_num,
    url: data.url,
  };
  chaptersDB.push(newChapter);
  return newChapter;
};

const deleteChapter = (id) => {
  const index = chaptersDB.findIndex((chapter) => chapter.id === id);
  if (index !== -1) {
    chaptersDB.splice(index, 1);
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

const editurl = (chapters_id,video_url) => {
  const index = chaptersDB.findIndex(chapter=> chapter.id === chapters_id)

  if(index !== -1){
      chaptersDB[index].url = video_url
      return chaptersDB[index]
  }
  return false
}




module.exports = {
  getChaptersByProgram,
  getChapterById,
  createChapter,
  deleteChapter,
  editChapter,
  editurl
}
