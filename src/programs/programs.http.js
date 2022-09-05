const programsControllers = require("./programs.controller");

const getAllMyPrograms = (req, res) => {
  const data = programsControllers.getAllPrograms();
  res.status(200).json({ items: data.length, programs: data });
};

const getMyProgramsById = (req, res) => {
  const id = req.params.id;
  const data = programsControllers.getProgramById(id);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `The anime with the id ${id} does not exist` });
  }
};

const registerMyPrograms = (req, res) => {
  const data = req.body;
  const file = req.file;
  if (!data) {
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
        season: "int",
        cover: "image-url",
        categories: "string"

      },
    });
  } else {
    const urlCover = `http://${req.hostname}:8000/media/covers/${req.file.filename}`
    const response = programsControllers.createProgram(data, urlCover);
    return res
      .status(201)
      .json({
        message: `Anime created succesfully with id: ${response.id}`,
        program: response,
      });
  }
};

const removeMyPrograms = (req, res) => {
  const id = req.params.id;

  if (id) {
    programsControllers.deleteProgram(id)
    return res.status(204).json();
  } else {
    return res.status(400).json({ message: "Invalid ID" });
  }
};

const editMyPrograms = (req, res) => {
  const id = req.params.programs_id;
  const data = req.body;
  if (!id) {
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
        seasons: "int",
        cover: "image-url",
        categories: "string",
      },
    });
  } else {
    const response = programsControllers.editProgram(id, data)
    return res.status(200).json({
      message: 'Anime edited succesfully',
      user: response
    })
  }
};



module.exports = {
  getAllMyPrograms,
  getMyProgramsById,
  registerMyPrograms,
  removeMyPrograms,
  editMyPrograms,
};
