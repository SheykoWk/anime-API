const chaptersControllers = require("./chapters.controllers");

const getByIdProgram = (req, res) => {
    console.log(req.params.program_id)
    const programID = req.params.program_id;
    const data = chaptersControllers.getChaptersByProgram(programID);
  
    if (data.length !== 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: `capitulos con el id ${programID} programa no existen` });
    }
  };


const getByIdchapter = (req, res) => {
    
  const chapter_id = req.params.chapter_id;
  const program_id = req.params.program_id;
    const data = chaptersControllers.getChapterById(program_id, chapter_id);
  
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: `El capitulo con el id ${chapter_id} no existe` });
    }
  };


  const getCreateChapter = (req, res) => {
    const data = req.body;
    const IDprogram = req.params.program_id
    if (!data) {
      return res.status(400).json({ message: "Missing Data" });
    } else if (
      
      !data.chapter_num ||
      !data.url 
    ) { 
      return res.status(400).json({
        message: "All fields must be completed",
        fields: {
          
          chapter_num: "Num",
          url: "www.chapter.com",
        
        },
      });
    } else {
      const response = chaptersControllers.createChapter(data, IDprogram);
      return res
        .status(201)
        .json({
          message: `chapter created succesfully with id: ${response.id}`,
          chapter: response,
        });
    }
  };

  const getDeleteChapter = (req, res) => {
    const chapter_id = req.params.chapter_id;
    const program_id = req.params.program_id;
    const data = chaptersControllers.deleteChapter(program_id, chapter_id);
  
    if (data) {
      return res.status(204).json({ message: "chapter delete exsit" });
    } else {
      return res.status(400).json({ message: "Invalid ID" });
    }
  };


  const getEditChapter = (req, res) => {
    const program_id = req.params.program_id;
    const chapter_id = req.params.chapter_id;
    const data = req.body;
    if (!Object.keys(data).length) {
      return res.status(400).json({ message: "Missing Data" });
    } else if (
        
        !data.chapter_num ||
        !data.url 
    ) {
      return res.status(400).json({
        message: "All fields must be completed",
        fields: {
            
            chapter_num: "Num",
            url: "www.chapter.com",
        },
      });
    } else {
      const response = chaptersControllers.editChapter(program_id, chapter_id, data)
      return res.status(200).json({
        message: 'Chapter edited succesfully',
        chapter: response
      })
    }
  };


  module.exports={
    getEditChapter,
    getDeleteChapter,
    getCreateChapter,
    getByIdchapter,
    getByIdProgram
  }
  