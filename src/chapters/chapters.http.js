const chapterController = require(`./chapters.controllers`);



const getAllC = (req, res) => {
    const program_id = req.params.programs_id;  
    
    const data = chapterController.getChaptersByProgram(program_id)
    
    if(data){
        res.status(200).json(data)
    }else{
        res.status(404).json({message: "user does not exist"})        
    }
}

const registerChapter = (req, res) => {
    const program_id = req.params.programs_id;

    const data = req.body;

    if (!data) {
        return res.status(400).json({ message: "Missing Data" });
      } else if (
        !data.chapter_num,
        !data.url
      ) {
        return res.status(400).json({
          message: "All fields must be completed",
          fields: {
            chapter_num: "string",
            url: "string",
          },
        });
      } else {
        const response = chapterController.createChapter(data, program_id)
        return res.status(201).json({ 
                message: `User created succesfully with id: ${response.id}`,
                user: response,
            }); 
      }
}

const getChapterId = (req, res) => {
    const chapterId = req.params.chapter_id;

    const data = chapterController.getChapterById(chapterId)

    res.status(200).json({data})
}

const editChapterId = (req, res) => {
    const chapterId = req.params.chapter_id;
    const data = req.body;

    if (!data) {
        return res.status(400).json({ message: "Missing Data" });
      } else if (
        !data.chapter_num,
        !data.url
      ) {
        return res.status(400).json({
          message: "All fields must be completed",
          fields: {
            chapter_num: "string",
            url: "string",
          },
        });
      } else {
        const response = chapterController.editChapter(chapterId, data)
        return res.status(201).json({ 
                message: `User created succesfully with id: ${response.id}`,
                user: response,
            }); 
      }
}

const removeChapter = (req, res) => {
    const chapterId = req.params.chapter_id;

    const data = chapterController.deleteChapter(chapterId)

    if(data){
        return res.status(204).json([{message: "treu"}])
    }else{
        return res.status(400).json({message: `Invalid ID`})
    }
}

module.exports = {
    getAllC,
    registerChapter,
    getChapterId,
    editChapterId,
    removeChapter
}