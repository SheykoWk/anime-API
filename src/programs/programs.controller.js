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
  },  {
    id: "1",
    title: "examplle",
    description:
      "Lexampledasdasdcacascas?",
    seasons: 4,
    cover: "localhost:8000/uploads/animes/bnha-cover.jpg",
    categories: ["Accion", "Comedia", "Escolares", "Shounen", "Superpoderes"],
  }
];

const getAllPrograms = () => {
  return programsDB;
};

const getProgramById = (id) => {
  const data = programsDB.filter((program) => program.id === id);
  return data[0] ? data[0] : false;
};

const createProgram = (data) => {
  const newProgram = {
    id: uuid.v4(),
    title: data.title,
    description: data.description,
    seasons: data.seasons,
    cover: data.cover ? data.cover : null,
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
  } else {
    return false;
  }
};

const editProgram = (data, id) => {
  const index = programsDB.findIndex((program) => program.id === id);
  if (index !== -1) {
    programsDB[index] = {
      id: id,
      title: data.title,
      description: data.description,
      seasons: data.seasons,
      cover: data.cover ? data.cover : null,
      categories: data.categories,
    };
    return programsDB[index];
  } else {
    return false;
  }
};

const editProfileImg = (id, imgUrl) => {
  const index = programsDB.findIndex((program) => program.id === id)
  console.log(id)
  if(index !== -1){
    programsDB[index].cover = imgUrl
    return programsDB[index]
  } else {
    return false
  }
}

module.exports = {
  getAllPrograms,
  getProgramById,
  createProgram,
  deleteProgram,
  editProgram,
  editProfileImg
}