const programsControllers = require('./programs.controller')

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
const remove = (req, res) => {
  const id = req.paramsid
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
      message: 'User edited succesfully',
      user: response
    })
  }
}
module.exports = {
  getAll,
  getById,
  register,
  remove,
  edit
}
