
const chaptersControllers = require('./chapters.controllers')
const programsControllers = require('../programs/programs.controller')

const getChaptersByProgram = (req, res) => {
    const id = req.params.programs_id
    
    const data = programsControllers.getProgramById(id)
    if (data) {
        const chapters = chaptersControllers.getChaptersByProgram(id)
        res.status(202).json({...data,chapters})
    } else {
        res.status(400).json({ message: `El programa con el id ${id} no existe` })
    }

}

const getChapterById = (req, res) => {
    const id = req.params.chapters_id
    const videoPath = req.params.video
    const data = chaptersControllers.getChapterById(id)
    if (data) {
        res.status(202).json({ items: data.length, chapters: data })
    } else {
        res.status(400).json({ message: `El chapter con el id ${id} no existe` })
    }
}

const register = (req, res) => {
    const data = req.body;
    const id = req.params.programs_id
    if (!data) {
        return res.status(400).json({ message: "Missing Data" });
    } else if (
        
        !data.chapter_num ||
        !req.file
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                program_id: "string",
                chapter_num: "string",
                
            }
        });
    } else {
        const videoUrl = `http://${req.hostname}:3000/uploads/anime/chapters/${req.file.filename}`
        const response = chaptersControllers.createChapter(data, id,videoUrl);
        
        
        return res.status(201).json({
            message: `chapter created succesfully with id: ${response.id}`,
            chapter: response
        });
    }
};


const editChapter = (req, res) => {
    const id = req.params.chapters_id
    const data = req.body


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
                program_id: "string",
                chapter_num: "string",
                url: "localhost:jgdjshdjshdhsdj"
            },
        });
    } else {
        const response = chaptersControllers.editChapter(id, data)
        return res.status(200).json({
            message: 'chapter edited succesfully',
            chapter: response
        })
    }
}


const remove = (req, res) =>{
    const id = req.params.chapters_id
    const data = chaptersControllers.deleteChapter(id)
  if(data){
    return res.status(204).json()
  }else{
    return res.status(400).json({message: "Invalid Id"})
  } 
}

const chaptersVideo = (req, res) => {
    const id = req.params.chapters_id;
    const videoPath = req.hostname + ':3000' + 'api/v1/uploads/' +req.file.filename
    const data = chaptersControllers.createEpisodes(id, videoPath)
    res.status(200).json(data)
}



module.exports = {
    getChaptersByProgram,
    register,
    getChapterById,
    editChapter,
    remove,
    chaptersVideo
}
