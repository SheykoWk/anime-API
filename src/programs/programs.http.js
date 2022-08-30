const programsControllers = require("./programs.controller");

const getAll = (req, res) => {
  const data = programsControllers.getAllPrograms();
  res.status(200).json({ count: data.length, programs: data });
};

const getById = (req, res) => {
  const programID = req.params.program_id;
  const data = programsControllers.getProgramById(programID);
  if (!data.length) {
    res.status(404).json({ message: "Not found this anime" });
  } else {
    res.status(200).json(data[0]);
  }
};

const create = (req, res) => {
  const data = req.body;
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
        categories: "['love', 'death', 'robots']",
      },
    });
  } else {
    const response = programsControllers.createProgram(data);
    return res.status(201).json({
      message: `Prgram created succesfully with id: ${response.id}`,
      program: response,
    });
  }
};

const remove = (req, res) => {
  const id = req.params.program_id;
  const response = programsControllers.deleteProgram(id);

  if (response) {
    return res.status(204).json();
  } else {
    return res.staus(400).json({ message: `Invalid program ID` });
  }
};

const edit = (req, res) => {
  const id = req.params.id;
  const data = req.body;

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
    const response = programsControllers.editProgram(id, data);
    if (response) {
      return res.status(200).json({
        message: "Program edited succesfully",
        user: response,
      });
    } else {
      return res.status(404).json({
        message: "Not found program ID",
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
