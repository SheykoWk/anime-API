const uuid = require("uuid");
const chaptersDB = require("./chaptersDB");
const { programsDB } = require("../programs/programs.controller");

const getChaptersByProgram = (programID, idprogms) => {
  const filteredProgms = programsDB.filter((prog) => prog.id === idprogms);
  const filteredChaps = chaptersDB.filter(
    (chapter) => chapter.program_id === programID
  );
  const data = Object.assign(filteredChaps, filteredProgms);
  return data;
};

const getChapterById = (id) => {
  const data = chaptersDB.filter((chapter) => chapter.id === id);
  return data;
};

const createChapter = (data, program_id, urlCp) => {
  const newChapter = {
    id: uuid.v4(),
    program_id: program_id,
    chapter_num: data.chapter_num,
    url: urlCp,
  };
  chaptersDB.push(newChapter);
  return newChapter;
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


module.exports = {
  getChaptersByProgram,
  getChapterById,
  createChapter,
  deleteChapter,
  editChapter
}
