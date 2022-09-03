
const programsControllers = require('./programs.controller')

const getAll = (req, res) => {
    const data = programsControllers.getAllPrograms();
    res.status(200).json({ items: data.length, programs: data });
  };

const getById = (req, res) => {
  const id = req.params.programs_id
  const data = programsControllers.getProgramById(id)
  if(data){
    res.status(200).json(data);
  }else{
    res.status(404).json({ message: `El programa con el id ${id} no existe` });
  }
}

const register = (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.title ||
    !data.description ||
    !data.seasons ||
    !req.file ||
    !data.categories 
  ) { 
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        title: "string",
        description: "string",
        seasons: 3,
        cover: "localhost:8000/uploads/animes/bnha-cover.jpg",
        categories: [
          'action',
          'Comedia',
          'fiction'
        ]
      },
    });
  } else {
    const coverUrl = `http://${req.hostname}:3000/uploads/anime/programs/${req.file.filename}`
    const response = programsControllers.createProgram(data,coverUrl);
    return res.status(201).json({
        message: `Programs created succesfully with id: ${response.id}`,
        programs: response
      });
  }
};

const removePrograms = (req, res) => {
  const id = req.params.programs_id
  const data = programsControllers.deleteProgram(id)
  if(data){
    return res.status(204).json()
  }else{
    return res.status(400).json({message: "Invalid Id"})
  }
};


const editProgram = (req, res) => {
  const id = req.params.programs_id
  const data = req.body
  

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.title ||
    !data.description ||
    !data.seasons ||
    !data.cover ||
    !data.categories
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        title: "string",
        description: "string",
        seasons: 3,
        cover: "localhost:8000/uploads/animes/bnha-cover.jpg",
        categories: [
          'action',
          'Comedia',
          'fiction'
        ]
      },
    });
  } else {
    const response = programsControllers.editProgram(id,data)
    return res.status(200).json({
      message: 'program edited succesfully',
      program: response
    })
  }
}


  module.exports = {
    getAll,
    getById,
    register,
    removePrograms,
    editProgram
  }