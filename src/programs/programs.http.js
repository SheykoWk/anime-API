const programsControllers = require('./programs.controller')
const chaptersControllers = require('../chapters/chapters.controllers')

const getAll = (req,res) => {
  const data = programsControllers.getAllPrograms()
  res.status(200).json({ item: data.length, users: data })
}
const getById = (req,res) => {
  const id = req.params.id
  const data = programsControllers.getProgramById(id)

  if(data) {
    res.status(200).json(data)
  } else {
    res.status(404).json({ message: `The program  with the id ${id} dont existing` })
  }
}

const getChapter = (req, res) => {
  const idProgram = req.params.id
  const data = chaptersControllers.getChaptersByProgram(idProgram)

  if(data) {
    res.status(200).json(data)
  } else {
    res.status(404).json({ message: `the chaprter with program id ${id} dont existing` })
  }
}

const getIdChaptersByIdProgram = (req, res) => {
  const idProgram = req.params.idProgram
  const idChapter = req.params.idChapter
 
  
  const data = chaptersControllers.getChapterById(idChapter)
 if(data) {
    res.status(200).json(data)
  } else {
    res.status(404).json({ message: `the chaprter with program id ${idProgram} dont existing` })
  }

  chaptersControllers.get
  console.log(data)
}

const register = (req, res) => {
  const data = req.body
  if(!data) {
    return res.status(400).json({ message: "Missing Data " })
  } else if (
    !data.title ||
    !data.description ||
    !data.seasons ||
    !data.cover ||
    !data.categories
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        title: "string",
        description: "string",
        seasons: "string",
        cover: "string",
        categories: "string"
      }
    })
  } else {
    const response = programsControllers.createProgram(data)
    return res
      .status(201)
      .json({
        message: `Program created succesfully with id: ${response.id}`,
        program: response
      })
  }
}
const registerChapter = (req, res) => {
   const data = req.body
   const idProgram = req.params.id

  if(!data) {
    return res.status(400).json({ message: "Missing Data " })
  } else if (
    !data.chapter_num ||
    !data.url 
    ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        chapter_num: "string",
        url: "string"
      }
    })
  } else {
    const response = chaptersControllers.createChapter(data, idProgram)
    return res
      .status(201)
      .json({
        message: `Chapter created succesfully with id: ${response.id}`,
        program: response
      })
  }
}
const remove = (req, res) => {
  const id = req.params.id
  const data = programsControllers.deleteProgram(id)
  if(data){
    return res.status(204).json()
  } else {
    return res.status(400).json({ message: "Invalid ID" })
  }
}

const edit = (req, res) => {
  const id = req.params.id
  const data = req.body
  if(!Object.keys(data).length){
    return res.status(400).json({ message: "Missing Data" })
  } else if (
    !data.title ||
    !data.description ||
    !data.seasons ||
    !data.cover ||
    !data.categories
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        title: "string",
        description: "string",
        seasons: "string",
        cover: "string",
        categories: "string"

      }
    })
  } else {
    const response = programsControllers.editProgram(id, data)
    return res.status(200).json({
      message: 'Program edited succesfully',
      user: response
    })
  }
}

postCoverImg = (req, res) => {
  const id = req.params.id
  const coverImg = req.hostname + ':8000' + '/uploads/anime/covers/' +req.file.filename

  const data = programsControllers.editProgramImg(id, coverImg)
  res.status(200).json(data)
}
postChapterVideo = (req, res) => {
  const id = req.params.idChapter
  const videoUrl = req.hostname + ':8000' + '/uploads/anime/chapters/' +req.file.filename

  const data = chaptersControllers.editChapterVideo(id, videoUrl)
  res.status(200).json(data)
}
module.exports = {
  getAll,
  getById,
  register,
  remove,
  edit,
  getChapter,
  registerChapter,
  getIdChaptersByIdProgram,
  postCoverImg,
  postChapterVideo
}
