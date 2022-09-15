const programsControllers = require('./programs.controller')


const getAll = (req, res) => {
    const data = programsControllers.getAllPrograms()
    return res.status(200).json({
        items: data.length,
        programs: data
    })
}

const getById = (req, res) => {
    const id =  req.params.id
    console.log(req.params)
    const data = programsControllers.getProgramById(id)
    if(data){
        res.status(200).json(data)
    } else {
        res.status(404).json({message: 'Invalid Id'})
    }
}

const create = (req, res) => {
    const body = req.body
    if(!Object.keys(body).length){
        res.status(400).json({message: 'Missing Data'})
    } else if(
        !body.title ||
        !body.description ||
        !body.seasons ||
        !body.categories 
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                title: "string",
                description: "string",
                seasons: "number",
                categories: ["string", "string"]
            }
        })
    } else {
        const data = programsControllers.createProgram(body)
        return res.status(201).json({
            message: `Program created succesfully with id: ${data.id}`,
            program: data
        })
    }
}

const remove = (req, res) => {
    const id = req.params.id
    const data = programsControllers.deleteProgram(id)
    if(data) {
        res.status(204).json()
    } else{
        return res.status(400).json({message: 'Invalid ID'})
    }
}

const edit = (req, res) => {
    const id = req.params.id
    const body = req.body
    if(!Object.keys(body).length) {
        return res.status(400).json({message: 'Missing Data'})
    } else if(
        !body.title ||
        !body.description ||
        !body.seasons ||
        !body.categories
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                title: "string",
                description: "string",
                seasons: "number",
                categories: ["string", "string"]
            }
        })
    }
        
    const data = programsControllers.editProgram(body, id)

    if(data) {
        return res.status(200).json({
            message: 'program edited succesfully',
            program: data
          })
    } else {
        return res.status(404).json({message: 'Invalid ID'})
    }
}

const postProfileImg = (req, res) => {
    const id = req.params.id;
    //mi-sitio.com/api/v1/users/me/profile-img
    //localhost:8000/api/v1/users/me/profile-img
    const imgPath = req.hostname + ':8000' + '/uploads/animes/' + req.file.filename 
  
    const data = programsControllers.editProfileImg(id, imgPath)
        if(data) {
            res.status(200).json(data)
        } else {
            res.status(400).json({message: 'Invalid ID'})
        }
  }

module.exports = {
    getAll,
    getById,
    create,
    remove,
    edit,
    postProfileImg
}