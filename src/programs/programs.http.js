const programsController = require("./programs.controller");

const getAllPro = (req, res) => {
  const data = programsController.getAllPrograms();
  res.status(200).json({ items: data.length, programs: data });
};

const getProById = (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const data = programsController.getProgramById(id);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `El Programa con el id ${id} no existe` });
  }
};

const registerPro = (req, res) => {
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
        seasons: "string",
        cover: "string",
        categories: "string",
      },
    });
  } else {
    const response = programsController.createProgram(data);
    return res.status(201).json({
      message: `Program created succesfully with id: ${response.id}`,
      program: response,
    });
  }
};

const removePro = (req, res) => {
  const id = req.params.id;
  const data = programsController.deleteProgram(id);

  if (data) {
    return res.status(204).json();
  } else {
    return res.status(400).json({ message: "Invalid ID" });
  }
};

const editPro = (req, res) => {
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
        seasons: "string",
        cover: "string",
        categories: "string",
      },
    });
  } else {
    const response = programsController.editProgram(id, data);
    return res.status(200).json({
      message: "Program edited succesfully",
      program: response,
    });
  }
};

const programImgCover = (req, res) => {
  const programId = req.program.id;
  //mi-sitio.com/api/v1/users/me/profile-img
  //localhost:8000/api/v1/programs/cover-img

  const imgPath =
    req.hostname + ":8000" + "/api/v1/uploads/media/covers" + req.file.filename;

  const data = programsController.editImgCover(programId, imgPath);
  res.status(200).json(data);
};

module.exports = {
  getAllPro,
  getProById,
  registerPro,
  removePro,
  editPro,
  programImgCover,
};
