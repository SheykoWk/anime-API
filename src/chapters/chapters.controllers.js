const uuid = require("uuid");

const chaptersDB = require("./chaptersDB");
const programsDB = require("../programs/programs.controller");
const getProgramById = require("../programs/programs.controller")
 



const getChaptersByProgram = (programID) => {

  const program = getProgramById.getProgramById(programID)

   console.log(program)
  const data = chaptersDB.filter((chapter) => chapter.program_id === programID);
     data.unshift(program[0])
    return data;
   
};

const getChapterById = (program_id, chapter_id) => {
  const dataProrgrams = chaptersDB.filter((chapter) => chapter.program_id === program_id);
  const dataChapter = dataProrgrams.filter(chapter => chapter.id === chapter_id)
  return dataChapter[0];
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

const deleteChapter = (program_id, chapter_id) => {
  const index = chaptersDB.findIndex((chapter) => chapter.id === chapter_id & chapter.program_id === program_id);
  if (index !== -1) {
    chaptersDB.slice(index, 1);
    return true;
  }
  return false;
};

const editChapter = (program_id, chapter_id, data) => {
  
  
  const index = chaptersDB.findIndex((chapter) => chapter.id === chapter_id & chapter.program_id === program_id);
  const editedChapter = {
    chapter_id: chapter_id,
    program_id: data.program_id?data.program_id : chaptersDB[index].program_id,
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
editChapter,
deleteChapter,
createChapter
};






