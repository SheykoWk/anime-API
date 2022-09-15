const chaptersControllers = require('./chapters.controllers')
const {getProgramById} = require('../programs/programs.controller')

const getAllChapter = (req, res) => {
    const programId = req.params.program_id
    const data = chaptersControllers.getChaptersByProgram(programId)
    if(data){
        return res.status(200).json(data)
    } else{
        return res.status(404).json({message: `The program with the ID: ${programId} does not exist`})
    }
}

const getChapterById = (req, res) => {
    const programId = req.params.program_id
    const chapterId = req.params.chapter_id
    const data = chaptersControllers.getChapterById(programId, chapterId)
    if(data){
        return res.status(200).json(data)
    } else {
        return res.status(404).json({message: 'Invalid ID'})
    }
}

const create = (req, res) => {
    const programId = req.params.program_id
    const body = req.body
    const data = chaptersControllers.createChapter(body, programId)
    const program = getProgramById(programId)
    if(data){
        return res.status(201).json({
            message: `Chapter created succesfully with id: ${data.id}`,
            program: program.title,
            chapter: data
        })
    }else if(!Object.keys(body).length) {
        return res.status(400).json({message: 'Missing Data'})
    } else if(
        !body.chapter_num ||
        !body.url
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                chapter_num: "number",
                url: "string"
            }
        })
    } else {
        return res.status(404).json({message: 'The program with the ID does not exist'})
    }
}

const remove = (req, res) => {
    const programId = req.params.program_id
    const chapterId = req.params.chapter_id
    const data = chaptersControllers.deleteChapter(programId, chapterId)
    if(data){
        return res.status(204).json()
    } else{
        return res.status(400).json({message: 'Invalid ID'})
    }
}

const edit = (req, res) => {
    const programId = req.params.program_id
    const chapterId = req.params.chapter_id
    const body = req.body
    const data = chaptersControllers.editChapter(programId, chapterId, body)
    if(data){
        return res.status(201).json({
            message: 'Chapter edited succesfully',
            chapter: data
        })
    }else if(!Object.keys(body).length) {
        return res.status(400).json({message: 'Missing Data'})
    } else if(
        !body.chapter_num ||
        !body.url
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                chapter_num: "number",
                url: "string"
            }
        })
    } else {
        return res.status(404).json({message: 'Invalid ID'})
    }
}

const postProfileImg  = (req, res) => {
    const programId = req.params.program_id
    const chapterId = req.params.chapter_id
    const imgPath = req.hostname + ':8000' + '/uploads/anime/chapters/' + req.file.filename 

    const data = chaptersControllers.editProfileImage(programId, chapterId, imgPath)
        if(data) {
            res.status(200).json(data)
        } else {
            res.status(400).json({message: 'Invalid ID'})
        }
  }

module.exports = {
    getAllChapter,
    getChapterById,
    create,
    remove,
    edit,
    postProfileImg
}