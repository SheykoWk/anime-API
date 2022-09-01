const uuid = require('uuid')

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
  const data = programsDB.find((program) => program.id === id);

  if (!data) throw { message: "Program didn't found", status: 404 };

  return data
};

const createProgram = (data) => {
  const { title, description, seasons, cover, categories } = data;

  const newProgram = { id: uuid.v4(), title, description, seasons, cover, categories };
  
  programsDB.push(newProgram);
  return newProgram;
};

const deleteProgram = (id) => {
  const index = programsDB.findIndex((program) => program.id === id);

  if (index === -1) throw { message: "Program didn't found", status: 404 };

  programsDB.splice(index, 1);
  return true;
};

const editProgram = (id, data) => {
  const index = programsDB.findIndex((program) => program.id === id);

  if (index === -1) throw { message: "Program didn't found", status: 404 };

  const { title, description, seasons, cover, categories } = data;

  const editedProgram = {
    id: id,
    title: title || programsDB[index].title,
    description: description || programsDB[index].description,
    seasons: seasons || programsDB[index].seasons,
    cover: cover || programsDB[index].cover,
    categories: categories || programsDB[index].categories,
  };

  programsDB[index] = editedProgram;
  return programsDB[index];
};

module.exports = {
  getAllPrograms,
  getProgramById,
  createProgram,
  deleteProgram,
  editProgram
}