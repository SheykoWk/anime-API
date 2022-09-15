const uuid = require("uuid");
const { getProgramById } = require('../programs/programs.controller')

const {chaptersDB} = require("./chaptersDB");


/*
  {
    "id": "88ebed0b-8095-4190-adde-d1165ca48815",
    "title": "Boku no hero academia",
    "description":
      "Las personas no nacen igual. El protagonista de esta historia es uno de esos casos raros que nacen sin superpoderes, pero esto no le impedirá perseguir su sueño: ser un gran héroe como el legendario All-Might. Para convertirse en el héroe que quiere ser, se apuntará a una de las academias de héroes más prestigiosas del país: Yueiko. Con la ayuda de su ídolo, All-Might, ¿podrá convertirse en un verdadero héroe?",
    "seasons": 4,
    "cover": "localhost:8000/uploads/animes/bnha-cover.jpg",
    "categories": ["Accion", "Comedia", "Escolares", "Shounen", "Superpoderes"],
	  "chapters": [{
      "id": "0868504c-436e-43a6-87b5-ea811326d416",
      "program_id": "88ebed0b-8095-4190-adde-d1165ca48815",
      "chapter_num": 1,
      "url": "localhost:8000/uploads/anime/chapters/bnha-1-1.mp4"
    },
    {
      "id": "d01ea354-a2f0-4115-95f2-2f0ae7acd948",
      "program_id": "88ebed0b-8095-4190-adde-d1165ca48815",
      "chapter_num": 2,
      "url": "localhost:8000/uploads/anime/chapters/bnha-1-2.mp4"
    }]
  }
*/
//YES
const getChaptersByProgram = (programID) => {
  const program = getProgramById(programID)
  const data = chaptersDB.filter((chapter) => chapter.program_id === programID);
  return program ? {...program, chapters: data} : false
};
//YES
const getChapterById = (programID, chapterID) => {
  console.log(programID, chapterID)
  const data = chaptersDB.filter((chapter) => chapter.id === chapterID && chapter.program_id === programID);
  return data.length ? data[0] : false;
};
//YES
const createChapter = (data, program_id) => {

  if(getProgramById(program_id) && data.url && data.chapter_num){
    const newChapter = {
      id: uuid.v4(),
      program_id: program_id,
      chapter_num: data.chapter_num,
      url: data.url
    };
    chaptersDB.push(newChapter);
    return newChapter;
  } else {
    return false
  }
};
// YES
const deleteChapter = (programID, chapterID) => {
  const index = chaptersDB.findIndex((chapter) => chapter.id === chapterID && chapter.program_id === programID);
  if (index !== -1) {
    chaptersDB.splice(index, 1);
    return true;
  } else {
    return false;
  }
};
//YES
const editChapter = (programID, chapterID, data) => {
  const index = chaptersDB.findIndex((chapter) => chapter.id === chapterID && chapter.program_id === programID);

  if(index !== -1 && data.url && data.chapter_num){
    chaptersDB[index] = {
      id: chapterID,
      program_id: programID,
      chapter_num: data.chapter_num,
      url: data.url
    }
    return chaptersDB[index]
  } else{
    return false
  }
};

const editProfileImage = (programID, chapterID, img) => {
  const index = chaptersDB.findIndex((chapter) => chapter.id === chapterID &&  chapter.program_id === programID )
  if(index != 1 ) {
    chaptersDB[index].url = img
    return chaptersDB[index]
  } else {
    return false
  }
}

module.exports = {
  getChaptersByProgram,
  getChapterById,
  createChapter,
  deleteChapter,
  editChapter,
  editProfileImage
}





