const chapterControllers = require('./chapters.controllers')

const getByIdProgram = (req, res) => {
  const id = req.params.id
  const data = chapterControllers.getChaptersByProgram(id)
  if(data){
    res.status(200).json(data)
  } else {
    res.status(404).json({ message: `El capitulo con id ${id} no existe` })
  }

}

const getById =(req,res) => {
  const id = req.params.id
  const data = chapterControllers.getChapterById(id)

  if(data){
    res.status(200).json(data)
  } else {
    res.status(404).json({ message: `El capitulo con id ${id} no existe` })
  }
}

const register = (req, res) => {
  const data = req.body
  if(!data) {
    return res.status(400).json({ message: "Missing Data" })
  } else if (
    !data.chapter_num ||
    !data.url
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        chapter_num: "number",
        url: "string"
      }
    })
  } else {
    const response = chapterControllers.createChapter(data)
    return res
      .status(201)
      .json({
        message: `Chapter created succesfully with id: ${response.id}`,
        chapter: response
      })
  }
} 
const remove = (req, res) => {
  const id = req.params.id
  const data = chapterControllers.deleteChapter(id)

  if(data) {
    return res.status(204).json()
  }else {
    return res.status(400).json({ message: "Invalid ID" })
  }
}

const edit = (req, res) => {
  const id = req.params.id;
  const data = req.body
  if(!Object.keys(data).lenght){
    return res.status(400).json({ message: "Missing Data" })
  } else if (
    !data.chapter_num ||
    !data.url
  ){
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        chapter_num: "string",
        url: "string"
      }
    })
  } else {
    const response = chapterControllers.editChapter(id, data)
    return res.status(200).json({
      message: 'User edited succesfully',
      user: response
    })
  }
}

module.exports = {
  getByIdProgram,
  getById,
  register,
  remove,
  edit
}
