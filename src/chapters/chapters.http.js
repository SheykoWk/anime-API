const chapterControllers = require("./chapters.controllers");
const programControllers = require("../programs/programs.controller");

const getByProgram = (req, res) => {
  const programId = req.params.program_id;
  if (programId) {
    const program = programControllers.getProgramById(programId);
    const data = chapterControllers.getChaptersByProgram(programId);
    res.status(200).json({
      items: data.length,
      program,
      chapters: data,
    });
  }
  res
    .status(400)
    .json({ message: `El programa con id ${programId} no existe` });
};

const getById = (req, res) => {
  const chapterId = req.params.chapter_id;
  const data = chapterControllers.getChapterById(chapterId);
  if (!data) {
    res
      .status(400)
      .json({ message: `El capitulo con id ${chapterId} no existe` });
  }
  res.status(200).json({ chapter: data });
};

const create = (req, res) => {
  const data = req.body;
  data.chapter_num = Number(data.chapter_num);
  const programId = req.params.program_id;
  const imgPath =
    req.hostname + ":8000" + "/api/v1/uploads/chapters/" + req.file.filename;
  if (programId) {
    if (data.chapter_num) {
      const response = chapterControllers.createChapter(
        data,
        programId,
        imgPath
      );
      res
        .status(201)
        .json({ message: `Chapter added succesfully with id: ${response.id}` });
    }
    res.status(400).json({ message: "Missing data" });
  }
  res
    .status(400)
    .json({ message: `El programa con id ${programId} no existe` });
};

const remove = (req, res) => {
  const chapterId = req.params.chapter_id;
  const data = chapterControllers.deleteChapter(chapterId);
  if (data) {
    return res.status(204).json();
  } else {
    return res.status(400).json({ message: "Invalid ID" });
  }
};

const edit = (req, res) => {
  const chapterId = req.params.chapter_id;
  const data = req.body;
  if (!Object.keys(data).length) {
    res.status(400).json({ message: "Missing data" });
  }
  const imgPath =
    req.hostname + ":8000" + "/api/v1/uploads/chapters/" + req.file.filename;
  const response = chapterControllers.editChapter(chapterId, data, imgPath);
  if (response) {
    res
      .status(200)
      .json({ message: "Chapter edited succesfully", chapter: response });
  }
};

module.exports = {
  getByProgram,
  getById,
  create,
  remove,
  edit,
};
