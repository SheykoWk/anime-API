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
  {
    id: "4038d488-03f1-4466-807d-933eb6825ba7",
    title: "YUGIO",
    description:
      "Anime de cartas",
    seasons: 4,
    cover: "localhost:8000/uploads/animes/bnha-cover.jpg",
    categories: ["Accion", "Comedia", "Escolares", "Shounen", "Superpoderes"],
  },
];
//D.1_A:OBTENER TODOS LOS PROGRAMAS
const getAllPrograms = () => {
  return programsDB;
};


//D.1_B:CREAR PROGRAMAS
// const createProgram = (data, program_id) => {
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


//D.2_A:OBTENER UN PRORAMA EN ESPECIFICO
const getProgramById = (id) => {
  const data = programsDB.filter((program) => program.id === id);
  return data.length?data[0]:null;
};

//D.2_B:EDITAR UN PROGRAMA
const editProgram = (id, data) => {
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
    programsDB[index] = editedProgram;
    return programsDB[index];
  }
  return false;
};

//C.2_C:ELIMINAR UN PROGRAMA
const deleteProgram = (id) => {
  const index = programsDB.findIndex((program) => program.id === id);
  if (index !== -1) {
    programsDB.splice(index, 1);
    return true;
  }
  return false;
};


//MULTER:POSTEAR LA IMAGEN DEL PROGRAMA
const editProgramCover = (program_id,coverUrl) => {
  const dataProgram=getProgramById(program_id)
  if(dataProgram){
    const index = programsDB.findIndex(user => user.id === program_id)
    if(index !== -1){
      programsDB[index].cover = coverUrl
      return programsDB[index]
    }
    return false
  }
  else{
    return false
  }
 
}




module.exports={
getAllPrograms,
createProgram,
getProgramById,
editProgram,
deleteProgram,
editProgramCover
}