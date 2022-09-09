const charapterControllers = require('./chapters.controllers')

const getAll = (req, res) => {
  const programId = req.params.program_id
  const data = charapterControllers.getChaptersByProgram(programId);
  res.status(200).json({ items: data.length, programs: data });
}

const getById = (req, res) => {
    const chapterId = req.params.chapter_id;
    const data = charapterControllers.getChapterById(chapterId);
  
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: `the episode with id ${chapterId} doesn't exist ` });
    }
}

const register = (req, res) => {
    const data = req.body;
    const url = req.file?.filename

    if (!data) {
      return res.status(400).json({ message: "Missing Data" });
    } else if (
      !data.program_id ||
      !data.chapter_num ||
      !(data.url || url)
    ) { 
      return res.status(400).json({
        message: "All fields must be completed",
        fields: {
          program_id: "string",
          chapter_num: "number",
          url: "url string",
        },
      });
    } else {
      const programId  = req.params.program_id
      const urlPath = req.hostname + '8000' + '/api/v1/uploads/' + req.file?.filename
      const response = charapterControllers.createChapter(data, programId, urlPath);
      return res.status(201).json({
          message: `chapter created succesfully with id: ${response.id}`,
          user: response,
        });
    }
}

const remove = (req, res) => {
    const id = req.params.chapter_id;
    const url = req.file?.filename
    const data = charapterControllers.deleteChapter(id);
  
    if (data) {
      return res.status(204).json();
    } else {
      return res.status(400).json({ message: "Invalid ID" });
    }
}

const edit = (req, res) => {
    const chapterId = req.params.chapter_id;
    const data = req.body;
    if (!Object.keys(data).length) {
      return res.status(400).json({ message: "Missing Data" });
    } else if (
      !data.program_id ||
      !data.chapter_num ||
      !(data.url || url)
    ) {
      return res.status(400).json({
        message: "All fields must be completed",
        fields: {
            program_id: "string",
            chapter_num: "number",
            url: "url string",
        },
      });
    } else {
      const urlPath = req.hostname + '8000' + '/api/v1/uploads/' + req.file?.filename
      const response = charapterControllers.editChapter(chapterId, data, urlPath)
      if(response) {
         return res.status(200).json({
            message: 'charapter edited succesfully',
            charapter: response
          })
      }
      return res.status(404).json({ message: `the episode with id ${chapterId} doesn't exist ` });
    }
  }

  module.exports = {
    getAll,
    getById,
    register,
    remove,
    edit
  }