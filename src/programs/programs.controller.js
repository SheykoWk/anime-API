const uuid = require('uuid')
const chaptersControllers = require('../chapters/chapters.controllers');
const programsDB = [
  {
    id: "88ebed0b-8095-4190-adde-d1165ca48815",
    title: "Boku no hero academia",
    description:
      "Las personas no nacen igual. El protagonista de esta historia es uno de esos casos raros que nacen sin superpoderes, pero esto no le impedirá perseguir su sueño: ser un gran héroe como el legendario All-Might. Para convertirse en el héroe que quiere ser, se apuntará a una de las academias de héroes más prestigiosas del país: Yueiko. Con la ayuda de su ídolo, All-Might, ¿podrá convertirse en un verdadero héroe?",
    seasons: 4,
    cover: "localhost:8000/uploads/animes/bnha-cover.jpg",
    categories: ["Accion", "Comedia", "Escolares", "Shounen", "Superpoderes"],
  },
];

const getAllPrograms = () => {
  return programsDB;
};

const getProgramById = (id) => {
  const data = programsDB.filter((program) => program.id === id);
  return data.length ? data[0] : false;
};

const createProgram = (data) => {
  const newProgram = {
    id: uuid.v4(),
    title: data.title,
    description: data.description,
    seasons: data.seasons,
    cover: data.cover_program ?data.cover_program:'',
    categories: data.categories,
  };
  programsDB.push(newProgram);
  return newProgram;
};

const deleteProgram = (id) => {
  const index = programsDB.findIndex((program) => program.id === id);
  if (index !== -1) {
    programsDB.splice(index, 1);
    return true;
  }
  return false;
};

const editProgram = (id, data) => {
  const index = programsDB.findIndex((program) => program.id === id);
  
  if (index !== -1) {
    const editedProgram = {
      id: id,
      title: data.title ? data.title : programsDB[index].title,
      description: data.description ? data.description : programsDB[index].description,
      seasons: data.seasons ? data.seasons : programsDB[index].seasons,
      cover: data.cover ? data.cover : '',
      categories: data.categories ? data.categories : programsDB[index].categories,
    };
    programsDB[index] = editedProgram;
    return programsDB[index];
  }else{
    return createProgram(data)
  }
  
};

const getAllChaptersOfProgramById = (programId) => {
  const data = getProgramById(programId);

  if (data) {
    const programId = data.id;
    const response = chaptersControllers.getChaptersByProgram(programId);
    data.chapters =response
    return data;

  }

  return false;

}

const createChapterToProgramById = (programId, chapterPath) => {
  const index = programsDB.findIndex(program => program.id === programId);
  if (index !== -1) {
    let chaptersLength = chaptersControllers.getChaptersByProgram(programId);
    chaptersLength =chaptersLength.length;
    
    const newChapter = {
      chapter_num: chaptersLength+1,
      url: chapterPath
    }

    const response = chaptersControllers.createChapter(newChapter, programId)
    return response;
  }

  return false;
}

//Specific chapter
const getAChapterByIdWhitProgramId=(chapterId)=>{
  const response = chaptersControllers.getChapterById(chapterId);
  
  return response.length? response[0]:false;
}


module.exports = {
  getAllPrograms,
  getProgramById,
  createProgram,
  deleteProgram,
  editProgram,
  createChapterToProgramById,
  getAllChaptersOfProgramById
}