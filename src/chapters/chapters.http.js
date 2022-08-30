const chaptersController = require('./chapters.controllers')

const getById = (req, res) => {
    const programID = req.params.program_id
    const data = chaptersController.getChaptersByProgram(programID)
    if(!data.length) {
        res.status(404).json({message: "Not found chapters about this anime"})
    }else {
        res.status(200).json({count: data.length, chapters: data})
    }
}