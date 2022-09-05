const uuid = require('uuid')


const programsDB = [
  {
    id: "88ebed0b-8095-4190-adde-d1165ca48815",
    title: "Boku no hero academia",
    frontpageimage: "",
    description:
      "Las personas no nacen igual. El protagonista de esta historia es uno de esos casos raros que nacen sin superpoderes, pero esto no le impedirá perseguir su sueño: ser un gran héroe como el legendario All-Might. Para convertirse en el héroe que quiere ser, se apuntará a una de las academias de héroes más prestigiosas del país: Yueiko. Con la ayuda de su ídolo, All-Might, ¿podrá convertirse en un verdadero héroe?",
    seasons: 4,
    cover: "localhost:8000/uploads/animes/bnha-cover.jpg",
    categories: ["Accion", "Comedia", "Escolares", "Shounen", "Superpoderes"],
  },

  {
    id: "84538743898940934",
    title: "vegeta no hero academia",
    frontpageimage: "",
    description:
      "Las personas no nacen igual se hacen. El protagonista de esta historia es uno de esos casos raros que nacen sin superpoderes, pero esto no le impedirá perseguir su sueño: ser un gran héroe como el legendario All-Might. Para convertirse en el héroe que quiere ser, se apuntará a una de las academias de héroes más prestigiosas del país: Yueiko. Con la ayuda de su ídolo, All-Might, ¿podrá convertirse en un verdadero héroe?",
    seasons: 6,
    cover: "localhost:8000/uploads/animes/bnha-cover.jpg",
    categories: ["Accion", "Comedia", "Escolares", "Shounen", "Superpoderes"],
  },
  {
    id: "5634675hjkckdc",
    title: "dragon no hero academia",
    frontpageimage: "",
    description:
      "las cosas no nacen igual. El protagonista de esta historia es uno de esos casos raros que nacen sin superpoderes, pero esto no le impedirá perseguir su sueño: ser un gran héroe como el legendario All-Might. Para convertirse en el héroe que quiere ser, se apuntará a una de las academias de héroes más prestigiosas del país: Yueiko. Con la ayuda de su ídolo, All-Might, ¿podrá convertirse en un verdadero héroe?",
    seasons: 8,
    cover: "localhost:8000/uploads/animes/bnha-cover.jpg",
    categories: ["Accion", "Comedia", "Escolares", "Shounen", "Superpoderes"],
  }
];



// const getAllChaptersbyIdProgram =(id) =>{
  
//   const data = chaptersDB.filter((chapter) => chapter.program_id == id);
//   console.log(data)
//   return data;
// }

const getAllPrograms = () => {
  return programsDB;
};

const getProgramById = (id) => {
  
  const data = programsDB.filter((program) => program.id == id);
  console.log(data)
  return data;
};

const createProgram = (data, program_id) => {
  const newProgram = {
    id: uuid.v4(),
    title: data.title,
    frontpageimage: data.frontpageimage?data.frontpageimage : "",
    description: data.description,
    seasons: data.seasons,
    cover: data.cover,
    categories: data.categories,
  };
  programsDB.push(newProgram);
  return newProgram;
};

const deleteProgram = (id) => {
  const index = programsDB.findIndex((program) => program.id === id);

  if (index !== -1) {
    // programsDB.slice(index, 1);
    console.log(programsDB.slice(index, 1))
    return true;
  }
  return false;
};

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

const editFrontPageProgram = (program_id, url) => {
  const index = programsDB.findIndex(program => program.id === program_id);
  if(index !== -1){
    programsDB[index].frontpageimage = url
    return programsDB[index]
  }
  return false
}


module.exports={
  getProgramById,
  getAllPrograms,
  editProgram,
  deleteProgram,
  createProgram,
  editFrontPageProgram
  
}