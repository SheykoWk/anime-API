const chaptersController = require("./chapters.controllers");

const getAllChaptersByPro = (req, res) => {
  const programId = req.params.program_id;
  const data = chaptersController.getChaptersByProgram(programId);
  res.status(200).json({ items: data.length, chapters: data });
};

const getAllChapterById = (req, res) => {
  const id = req.params.chapter_id;
  const data = chaptersController.getChapterById(id);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `El Programa con el id ${id} no existe` });
  }
};

const register = (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ message: "Missing Data" });
  } else if ((!data.chapter_num, !data.url)) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        chapter_num: Number,
        url: "string",
      },
    });
  } else {
    const response = chaptersController.createChapter(data);
    return res.status(201).json({
      message: `Chapter created succesfully with id: ${response.id}`,
      chapter: response,
    });
  }
};

const remove = (req, res) => {
  const id = req.params.chapter_id;
  const data = chaptersController.deleteChapter(id);

  if (data) {
    return res.status(204).json();
  } else {
    return res.status(400).json({ message: "Invalid ID" });
  }
};

const edit = (req, res) => {
  const id = req.params.chapter_id;
  const data = req.body;
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else if ((!data.chapter_num, !data.url)) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        chapter_num: Number,
        url: "string",
      },
    });
  } else {
    const response = chaptersController.editChapter(id, data);
    return res.status(200).json({
      message: "Chapter edited succesfully",
      program: response,
    });
  }
};

module.exports = {
  getAllChaptersByPro,
  getAllChapterById,
  register,
  remove,
  edit,
};
