const programsControllers = require("./programs.controller");

const getAll = (req, res) => {
  const data = programsControllers.getAllPrograms();
  return res.status(200).json({ count: data.length, programs: data });
};

const getById = (req, res) => {
  const programID = req.params.program_id;
  const data = programsControllers.getProgramById(programID);
  if (!data.length) {
    return res.status(404).json({ message: "Not found this anime" });
  } else {
    return res.status(200).json(data[0]);
  }
};

const create = (req, res) => {
    const cover = req.hostname + ':8000' + '/uploads/media/covers/' + req.file.filename 
    const data = req.body;
    data.cover = cover;
    
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
        seasons: "number",
        cover: "img",
        categories: ['love', 'death', 'robots'],
      },
    });
  } else {
    data.categories = JSON.parse(data.categories)
    data.seasons = JSON.parse(data.seasons)
    const response = programsControllers.createProgram(data);
    return res.status(201).json({
      message: `Program created succesfully with id: ${response.id}`,
      program: response,
    });
  }
};

const remove = async (req, res) => {
  const id = req.params.program_id;
  const response = await programsControllers.deleteProgram(id);

  if (response === "Not Found") {
    return res.status(404).json({
      message: "File not found in directory",
    });
  } else if(response) {
    return res.status(204).json();
  } else {
    return res.status(404).json({
      message: "Invalid program Id",
    });
  }
};

const edit = async (req, res) => {
  const cover = req.hostname + ':8000' + '/uploads/media/covers/' + req.file.filename 
  const id = req.params.program_id;
  const data = req.body;
  data.cover = cover;

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
        seasons: "number",
        cover: "img",
        categories: "['love', 'death', 'robots']",
      },
    });
  } else {
    data.categories = JSON.parse(data.categories)
    data.seasons = JSON.parse(data.seasons)
    const response = await programsControllers.editProgram(id, data);
    if (response === "Not Found") {
      return res.status(404).json({
        message: "File not found in directory",
      });
    } else if(response) {
      return res.status(200).json({
        message: "Program edited succesfully",
        user: response,
      });
    } else {
      return res.status(404).json({
        message: "Invalid program id",
      });
    }
  }
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  edit,
};
