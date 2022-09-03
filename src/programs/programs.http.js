const programControllers = require("./programs.controller");

// servicio para traer a todos los programas.
const getAllProgms = (req, res) => {
  const data = programControllers.getAllPrograms();
  return res.status(200).json({ items: data.length, programs: data });
};

// servicio para mostrar un programa por ID.
const getProgmsById = (req, res) => {
  const id = req.params.id;
  const data = programControllers.getProgramById(id);
  if (id) {
    return res.status(200).json(data);
  } else {
    return res
      .status(404)
      .json({ message: `The program with the ${id} does not exist` });
  }
};

// servicio para crear un programa.
const createProgms = (req, res) => {
  const data = req.body;
  const file = req.file;
  if (!data && !file) {
    return res.status(400).json({ message: "Missing data" });
  } else if (
    !data.title ||
    !data.description ||
    !data.seasons ||
    !file ||
    !data.categories
  ) {
    return res.status(400).json({
      message: "You have unfilled fields",
      fields: {
        title: "string",
        description: "string",
        seasons: "int",
        cover: "archivo.png",
        categories: "string"
      },
    });
  } else {
    
    const urlCover = `http://${req.hostname}:8000/uploads/animes/${req.file.filename}`
    const response = programControllers.createProgram(data, urlCover);
    return res.status(201).json(response);
  }
};

// servicio para eliminar un programa.
const deleteProgms = (req, res) => {
  const id = req.params.id;
  if (id) {
    programControllers.deleteProgram(id);
    return res.status(204).json();
  } else {
    return res
      .status(400)
      .json({ message: `The program with the ${id} does not exist` });
  }
};

// servicio para editar un programa.
const editProgms = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ message: `There is no program with this ${id}` });
  } else if (
    !data.title ||
    !data.description ||
    !data.seasons ||
    !data.cover ||
    !data.categories
  ) {
    return res.status(400).json({
      message: "Missing data to be modified",
      fields: {
        title: "string",
        description: "string",
        season: "int",
        cover: "ruta-img",
        categories: "string",
      },
    });
  } else {
    const response = programControllers.editProgram(id, data);
    res
      .status(200)
      .json({
        message: "Data have been successfully modified",
        result: response,
      });
  }
};

// const postImgCover = (req, res) => {
//   const id = req.params.program_id;
//   const imgPath = req.hostname + ":8000" + "/uploads/covers" + req.file.filename;
//   const data = programControllers.imgCover(id, imgPath)
//   if(data){
//     return res.status(200).json(data);
//   }else{
//     return res.status(400).json({message: 'The action could not be completed successfully'})
//   }
// };


module.exports = {
  getAllProgms,
  getProgmsById,
  createProgms,
  editProgms,
  deleteProgms,
};
