const uuid = require('uuid')

const programsDB = [
  {
    id: "88ebed0b-8095-4190-adde-d1165ca48815",
    title: "Mr.Robot",
    description:
      "Socially inept Elliot Alderson works at cyber security company Allsafe. At night, he hacks social media, personal information, and bank records, including those of his co-workers, therapist, and a drug dealer. Elliot stops a DDoS attack against Allsafe's biggest client, E Corp. He identifies a file labeled fsociety00.dat and a text file asking him not to destroy malware he finds hidden on E Corp's server. Mr. Robot, the mysterious leader of the hacker group fsociety, contacts Elliot on the subway. Fsociety invites Elliot to join them in starting a digital revolution; they plan to delete all debt records held by E Corp. He is intrigued and eventually agrees. As his first collaborative act with fsociety, Elliot provides the FBI with an encrypted file falsely implicating Terry Colby, E Corp's own chief technology officer (CTO) as the orchestrator of the attack.",
    seasons: 4,
    cover: "localhost:8000/uploads/series/mrRobot-cover.jpg",
    categories: ["Drama", "Psychological Thriller", "Tecno-thriller"]
  },
];

const getAllPrograms = () => {
  return programsDB;
};

const getProgramById = (id) => {
  const data = programsDB.filter((program) => program.id === id);
  return data[0];
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

const deleteProgram = (id) => {
  const index = programsDB.findIndex((program) => program.id === id);
  if (index !== -1) {
    programsDB.slice(index, 1);
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

const editCover = (urlFile, programID) => {
    const index = programsDB.findIndex(program => program.id === programID)
    if (index !== -1) {
      programsDB[index].cover = urlFile;
      return programsDB[index];
    }
    return false;
}


module.exports = {
  getAllPrograms,
  getProgramById,
  createProgram,
  deleteProgram,
  editProgram,
  editCover
}