const programsControllers = require('./programs.controller')


const getAll = (req, res) => {
    const data = programsControllers.getAllPrograms()
    res.status(200).json({items: data.length,
    programs: data})
}


const getById = (req, res) => {
    const programId = req.params.program_id
    const data = programsControllers.getProgramById(programId)
    if(data){
        res.status(200).json({program: data})
    }

    res.status(400).json({message: 'Invalid ID'})
}

const create = (req, res) => {
    const data = req.body
    const imgPath = req.hostname + ':8000' + '/api/v1/uploads/covers/' + req.file.filename
    if(!data.title ||
        !data.description ||
        !data.seasons ||
        !data.categories){
        res.status(400).json({message: 'Missing Data'})
    }
    data.seasons = Number(data.seasons)
    data.cover = imgPath
    const response = programsControllers.createProgram(data)
    res.status(200).json({message: `Program created succesfully with ID: ${response.id}`})
}


const remove = (req, res) => {
    const programId = req.params.program_id
    const data = programsControllers.deleteProgram(programId)
    if(data){
        return res.status(204).json()
    }
    return res.status(400).json({message: `Invalid id: ${programId}`})
}


const edit = (req, res) => {
    const data = req.body
    const programId = req.params.program_id
    if(!Object.keys(data).length){
        res.status(400).json({message: 'Missing data'})
    }
    const imgPath = req.hostname + ':8000' + '/api/v1/uploads/covers/' + req.file.filename
    const response = programsControllers.editProgram(programId, data, imgPath)
    if(response){
        res.status(200).json({message: 'Program edited succesfully', chapter: response})
    }
}


module.exports = {
    getAll,
    getById,
    create,
    remove,
    edit
} 