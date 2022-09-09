const porgramControllers = require('./programs.controller')

const getAll = (req, res) => {
    const response = porgramControllers.getAllPrograms()

    return res.status(200).json({items: response.length, programs: response})
}

const getById = (req, res) => {
    const programId = req.params.program_id
    const response = porgramControllers.getProgramById(programId)
    console.log(response)

    if(response.length) {
        return res.status(200).json({program: response})
    } else {
        return res.status(404).json({message: `The program with the id: ${programId} is invalid`})
    }
}

const create = (req, res) => {
    const data = req.body
    const cover = req.file?.filename
    
    if(!data) {
        return res.status(400).json({message: "Missing data"})
    } else if( 
        !data.title ||
        !data.description ||
        !data.seasons ||
        !(cover || data.cover) ||
        !data.categories
        ) {
            return res.status(400).json({
                message: "All fields must be completed",
                fields: {
                    title: 'string',
                    description: 'string',
                    seasons: "number",
                    cover: 'string URL',
                    categories: '[string]'
                },
                data
            })
        } else {
            const coverPath = req.hostname + '8000' + '/api/v1/uploads/' + req.file?.filename
            const response = porgramControllers.createProgram(data, coverPath) 
            return res.status(201).json({
                message: `Program created succesfully with id: ${response.id}`,
                user: response,
            })
        }

}

const remove = (req, res) => {

    const program_id = req.params.program_id
    const response = porgramControllers.deleteProgram(program_id)
    if(response) {
        return res.status(204).json()
    } else {
        return res.status(400).json({message: 'Invalid Id'})
    }
    
}

const edit = (req, res) => {
    const program_id = req.params.program_id
    const cover = req.file?.filename
    const data = req.body


    if (!Object.keys(data).length) {
        return res.status(400).json({message: 'Missing data'})
    } else if(
        !data.title ||
        !data.description ||
        !data.seasons ||
        !(cover || data.cover) ||
        !data.categories
    ){
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                title: 'string',
                description: 'string',
                seasons: 'number',
                cover: 'string URL',
                categories: '[string, string...]',
            }
        });
    } else {
        const coverPath = req.hostname + '8000' + '/api/v1/uploads/' + req.file?.filename
        const response = porgramControllers.editProgram(program_id, data, coverPath)
        return res.status(200).json({
            message: 'Program edited succesfully',
            user: response
          })
    }
}


module.exports = {
    getAll,
    getById,
    create,
    remove,
    edit
}