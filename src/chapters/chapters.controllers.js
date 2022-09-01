const uuid = require("uuid");

const chaptersDB = require("./chaptersDB");

const getChaptersByProgram = programID => {
  const data = chaptersDB.filter((chapter) => chapter.program_id === programID);
  return data;
};

const getChapterById = (id) => {
  const data = chaptersDB.find((chapter) => chapter.id === id);

  if (!data) throw { message: "Chapter didn't found in this program", status: 404 };

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

const deleteChapter = (id) => {
  const index = chaptersDB.findIndex((chapter) => chapter.id === id);

  if (index === -1) throw { message: "Chapter didn't found", status: 404 };

  chaptersDB.splice(index, 1);
  return true;
};

const editChapter = (id, data) => {
  const index = chaptersDB.findIndex((chapter) => chapter.id === id);

  if (index === -1) throw { message: "Chapter didn't found", status: 404 };

  const { program_id, chapter_num, url } = data;

  const editedChapter = {
    id: id,
    program_id: program_id || chaptersDB[index].program_id,
    chapter_num: chapter_num || chaptersDB[index].chapter_num,
    url: url || chaptersDB[index].url
  };

  chaptersDB[index] = editedChapter;
  return chaptersDB[index]
};

module.exports = {
  getChaptersByProgram,
  getChapterById,
  createChapter,
  deleteChapter,
  editChapter
}