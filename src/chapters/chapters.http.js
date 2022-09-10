const chaptersControllers = require('./chapters.controllers');
const programsControllers = require('../programs/programs.controller')

const getAllChaps = (req, res) => {
  const id = req.params.id;
    const data = programsControllers.getProgramById(id);
    const datachap = chaptersControllers.getChaptersByProgram(id);
    if(data){
    return res.status(200).json({ ...data, chapters: datachap });
    }res.status(400).json({message: 'Program doesnt exist'})
};

const getChapById = (req, res) => {
    const chapter_id = req.params.chapter_id;
    const data = chaptersControllers.getChapterById(chapter_id);

    if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: `Chapter with the id ${chapter_id} doesn't exist` });
      }
    };

const createChap = (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
        !data.id ||
        !data.program_id ||
        !data.chapter_num ||
        !data.url
    ){
      res.status(400).json({message: 'All fields must be completed'})
    } else {
      const response = chaptersControllers.createChapter(data)
      return res
            .status(201)
            .json({
              message: `Chapter created successfully with id: ${response.id}`,
              chapter: response,
            });
    }
}

const editChap = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    if (!Object.keys(data).length) {
        return res.status(400).json({ message: "Missing Data" });
        } else if (
          !data.program_id ||
          !data.chapter_num ||
          !data.url
        ) {
            return res.status(400).json({
            message: "All fields must be completed",
            fields: {
              chapter_num: 20,
              url: "localhost:8000/uploads/series/chapters/example-1-1.mp4"
            },
          });
        } else {
          const response = chaptersControllers.editChapter(id, data)
          return res.status(200).json({
            message: 'Chapter edited succesfully',
            chapter: response
          })
        }
      };

const removeChap = (req, res) => {
    const id = req.params.id;
    const data = chaptersControllers.deleteChapter(id);
      
    if (data) {
        return res.status(204).json({ message: `Deleted chapter with id: ${id}` });
      } else {
        return res.status(400).json({ message: "Invalid ID" });
      }
    };

const addChapterImg = (req, res) => {
    const chapterID = req.params.id;
    const imgPath = req.hostname + ':8000' + '/api/v1/uploads/' + req.file.filename;
    const data = chaptersControllers.editChapterImg(imgPath, chapterID);
      res.status(200).json(data)
  }

module.exports = {
    getAllChaps,
    getChapById,
    createChap,
    editChap,
    removeChap, 
    addChapterImg
}