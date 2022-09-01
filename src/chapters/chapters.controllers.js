const uuid = require("uuid");
const removeFile = require("../utils/removeFile");

const chaptersDB = require("./chaptersDB");

const getChaptersByProgram = (program_id) => {
  const data = chaptersDB.filter((chapter) => chapter.program_id === program_id);
  return data;
};

const getChapterById = (program_id, chapter_id) => {
  const data = chaptersDB.filter((chapter) => chapter.id === chapter_id && chapter.program_id === program_id);
  return data;
};

const createChapter = (data, program_id) => {
  const newChapter = {
    id: uuid.v4(),
    program_id,
    chapter_num: data.chapter_num,
    url: data.url,
  };
  chaptersDB.push(newChapter);
  return newChapter;
};

const deleteChapter = async (program_id, chapter_id) => {
  const index = chaptersDB.findIndex((chapter) => chapter.id === chapter_id && chapter.program_id === program_id);
  if (index !== -1) {
    const response = await removeFile(chaptersDB[index].url)
    if(response) {
      chaptersDB.splice(index, 1);
      return true;
    }else {
      return "Not Found"
    }
  }
  return false;
};

const editChapter = async (program_id, chapter_id, data) => {
  const index = chaptersDB.findIndex((chapter) => chapter.id === chapter_id && chapter.program_id === program_id);
  const editedChapter = {
    id: chapter_id,
    program_id: program_id,
    chapter_num: data.chapter_num ? data.chapter_num : chaptersDB[index].chapter_num,
    url: data.url ? data.url : chaptersDB[index].url,
  };
  if(index !== -1){
    const response = await removeFile(chaptersDB[index].url)
    if(response) {
      chaptersDB[index] = editedChapter
      return chaptersDB[index]
    }else {
      return "Not found"
    }
  }
  return false
};

module.exports = {
  getChapterById,
  getChaptersByProgram,
  createChapter,
  deleteChapter,
  editChapter
}