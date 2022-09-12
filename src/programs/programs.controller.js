const uuid = require('uuid');
const removeFile = require('../utils/removeFile.js');

const programsDB = [
  {
    id: "88ebed0b-8095-4190-adde-d1165ca48815",
    title: "Boku no hero academia",
    description:
      "Las personas no nacen igual. El protagonista de esta historia es uno de esos casos raros que nacen sin superpoderes, pero esto no le impedirá perseguir su sueño: ser un gran héroe como el legendario All-Might. Para convertirse en el héroe que quiere ser, se apuntará a una de las academias de héroes más prestigiosas del país: Yueiko. Con la ayuda de su ídolo, All-Might, ¿podrá convertirse en un verdadero héroe?",
    seasons: 4,
    cover: "localhost:8000/uploads/media/covers/bnha-cover-1.jpg",
    categories: ["Accion", "Comedia", "Escolares", "Shounen", "Superpoderes"],
  },
];

const getAllPrograms = () => {
  return programsDB;
};

const getProgramById = (id) => {
  const data = programsDB.filter((program) => program.id === id);
  return data;
};

const createProgram = (data) => {
  const newProgram = {
    id: uuid.v4(),
    title: data.title,
    description: data.description,
    seasons: data.seasons,
    cover: data.cover,
    categories: data.categories,
  };
  programsDB.push(newProgram);
  return newProgram;
};

const deleteProgram = async (id) => {
  const index = programsDB.findIndex((program) => program.id === id);
  if (index !== -1) {
    const response = await removeFile(programsDB[index].cover)
    if(response){
      programsDB.splice(index, 1);
      return true;
    }else {
      return "Not Found";
    }
  }
  return false;
};

const editProgram = async (id, data) => {
  const index = programsDB.findIndex((program) => program.id === id);
  const editedProgram = {
    id: id,
    title: data.title ? data.title : programsDB[index].title,
    description: data.description ? data.description : programsDB[index].description,
    seasons: data.seasons ? data.seasons : programsDB[index].seasons,
    cover: data.cover ? data.cover : programsDB[index].cover,
    categories: data.categories ? data.categories : programsDB[index].categories,
  };
  if (index !== -1) {
    const response = await removeFile(programsDB[index].cover)
    if(response){
      programsDB[index] = editedProgram;
      return programsDB[index];
    }else {
      return "Not Found";
    }
  }
  return false;
};

module.exports = {
  getAllPrograms,
  getProgramById,
  createProgram,
  deleteProgram,
  editProgram,
  programsDB
}