const chaptersControllers = require('./chapters.controllers')

const getChapter = (req, res) => {
    const programId = req.params.program_id
    const data = chaptersControllers.getChaptersByProgram(programId)
    if (data) {
        res.status(200).json(data)
    } else {
        res.status(400).json({ message: 'Invalid id' })
    }
}

const register = (req, res) => {
    const programID = req.params.program_id
    const data = req.body
    if (!Object.keys(data)) {
        return res.status(400).json({ message: 'Missing data' })
    } else if (typeof(data.chapter_num) !== 'number') {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                chapter_num: 'number'
            }
        })
    } else {
        const body = chaptersControllers.createChapter(data, programID)
        return res.status(201).json({ message: `Chapter created succesfully wuth id: ${body.id}`, chapter: body })
    }
}

const getById = (req, res) => {
    const id = req.params.chapter_id
    const data = chaptersControllers.getChapterById(id)
    if (data) {
        return res.status(200).json(data)
    } else {
        return res.status(400).json({ message: 'Invalid id' })
    }
}
const remove = (req, res) => {
    const id = req.params.chapter_id
    const data = chaptersControllers.deleteChapter(id)
    if (data) {
        return res.status(204).json(data)
    } else {
        return res.status(400).json({ message: 'Invalid id' })
    }
}
const edit = (req, res) => {
    const id = req.params.chapter_id
    const data = req.body
    if (typeof(data.chapter_num) !== 'number') {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                chapter_num: 'number'
            }
        })
    } else {
        const response = chaptersControllers.editChapter(id, data)
        return res.status(200).json(response)
    }
}
const postChapter = (req, res) => {
    const id = req.params.chapter_id
    const chapterUrl = req.hostname + ':8000' + '/api/v1/uploads/animes/chapters/' + req.file.filename
    const data = chaptersControllers.postChapter(id, chapterUrl)
    if (data) {
        return res.status(200).json(data)
    } else {
        console.log(data)
        return res.status(400).json({ message: `The program with the id ${id} does not exist` })
    }
}
module.exports = {
    getChapter,
    register,
    getById,
    remove,
    edit,
    postChapter
}