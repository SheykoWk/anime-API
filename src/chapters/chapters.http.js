const chaptersControllers = require('./chapters.controllers');

const getAllChaptersByProgram = (req, res) => {
    const program = req.body.program_id
    const data = chaptersControllers.getChaptersByProgram(program);
    if(data){
      return
  res.status(200).json(data);
    }else {
      return res.status(404).json({message: 'Can not Found'})
    }
};

const getChapterById = (req, res) => {
  const id = req.params.program_id;
  const data = chaptersControllers.getChapterById(id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `The anime with the id ${id} dont found` });
  }
};

const registerChapters = (req, res) => {
  const data = req.body;
  const programsId = req.params.program_id;
  const file = req.file;

  if (!data && !file){
    return res.status(400).json({message: 'Missing Data'})
  } else  {
    const urlMp = `http://${req.hostname}:8000/media/chapters/${req.file.filename}`
    const response = chaptersControllers.createChapter(data, programsId, urlMp)
    return res.status(201).json(response)
  }
};

const removeChapter = (req, res) => {
  const id = req.params.chapter_id;
  if (data) {
    chaptersControllers.deleteChapter(id);
    return res.status(204).json();
  } else {
    return res.status(400).json({ message: "Invalid ID" });
  }
};

const editChapter = (req, res) => {
  const id = req.params.chapter_id;
  const data = req.body;
  if (!data) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.chapter_num ||
    !data.url 
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        program_id: 'number',
        chapter_num: "number",
        url: "chapter-url",
      },
    });
  } else {
    const response = chaptersControllers.editChapter(id, data)
    return res.status(200).json({
      message: 'Anime edited succesfully',
      user: response
    })
  }
};



module.exports = {
 getAllChaptersByProgram,
 getChapterById,
 registerChapters,
 removeChapter,
 editChapter
};