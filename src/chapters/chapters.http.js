const chaptersControllers = require("./chapters.controllers");
const programsControllers = require("../programs/programs.controller")

const getByProgram = (req, res) => {
  const programID = req.params.program_id;
  const programData = programsControllers.getProgramById(programID);
  
  if(programData.length) {
    const data = chaptersControllers.getChaptersByProgram(programID);
    if (!data.length) {
      return res.status(404).json({ message: "Not found chapters about this anime" });
    } else {
      programData[0].chapters = data
      return res.status(200).json(programData[0]);
    }
  }else {
    return res.status(404).json({message: "Not found program with this id"})
  }
};

const getById = (req, res) => {
  const programID = req.params.program_id;
  const chapterID = req.params.chapter_id;
  const data = chaptersControllers.getChapterById(programID, chapterID);
  if (!data.length) {
    return res.status(404).json({ message: "Invalid Id" });
  } else {
    return res.status(200).json(data);
  }
};

const create = (req, res) => {
  const url = req.hostname + ":8000" + "/uploads/media/chapters/" +
    req.file.filename;
  const programID = req.params.program_id
  const data = req.body;
  data.url = url;
  if (!data) {
    return res.status(400).json({ message: "Missing Data" });
  } else if ( !data.chapter_num) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        chapter_num: "number",
        chapter: "video"
      },
    });
  } else if (!programsControllers.getProgramById(programID).length) {
    return res.status(404).json({message: "Invalid program Id"})
  } else {
    data.chapter_num = JSON.parse(data.chapter_num);
    const response = chaptersControllers.createChapter(data, programID);
    return res.status(201).json({
      message: `Chapter created succesfully with id: ${response.id}`,
      chapter: response,
    });
  }
};

const remove = async (req, res) => {
  const programID = req.params.program_id;
  const chapterID = req.params.chapter_id;
  const response = await chaptersControllers.deleteChapter(programID, chapterID);

  if (response === "Not Found") {
    return res.status(404).json({
      message: "File not found in directory",
    });
  } else if(response) {
    return res.status(204).json();
  } else {
    return res.status(404).json({
      message: "Invalid chapter Id",
    });
  }
};

const edit = async (req, res) => {
  const url = req.hostname + ':8000' + '/uploads/media/chapters/' + req.file.filename 
  const programID = req.params.program_id;
  const chapterID = req.params.chapter_id;
  const data = req.body;
  data.url = url;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.chapter_num ||
    !data.url
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        program_id: "string",
        chapter_num: "number",
        chapter_url: "video",
      },
    });
  } else {
    data.chapter_num = JSON.parse(data.chapter_num)
    const response = await chaptersControllers.editChapter(programID, chapterID, data);
    if (response === "Not Found") {
      return res.status(404).json({
        message: "File not found in directory",
      });
    } else if(response) {
      return res.status(200).json({
        message: "Chapter edited succesfully",
        user: response,
      });
    } else {
      return res.status(404).json({
        message: "Invalid chapter id",
      });
    }
  }
};

module.exports = {
  getById,
  getByProgram,
  create,
  remove,
  edit
}