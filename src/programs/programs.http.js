const programControllers = require('./programs.controller')


const getPrograms = (req, res) => {
    const data = programControllers.getAllPrograms();
    
    res.status(200).json({
        items: data.length, 
        programs: data
    })
}

const getProgramById = (req, res) => {
    const id = req.params.program_id

    const response = programControllers.getProgramById(id)

    if(!response) {
        res.status(400).json({
            message: `the program wiht the id: ${id} don't exist`
        })
    } else {
        res.status(200).json(response)
    }
}

const createProgram = (req, res) => {
    const data = req.body

    if(
        !data.title || 
        !data.description || 
        !data.seasons || 
        !data.categories
    ) {
        return res.status(400).json({
            message: 'All fileds must be completed',
            fields: {
                title: "string",
                description: "string",
                seasons: "number",
                categories: "array"
            }
        })
    } else {
        const response = programControllers.createProgram(data)

        if(response) {
            res.status(201).json({
                message: `The program was create succesfully wiht the id: ${response.id}`,
                program: response
            })
        } else {
            res.status(400).json({
                message: 'We should have a problem with the data'
            })
        }
    }
}

const edit = (req, res) => {
    const id = req.params.program_id
    const data = req.body

    if(!id) {
        res.status(400).json({
            message: `the program wiht the id: ${id} don't exist`
        })
    }

    const response = programControllers.editProgram(id, data)

    if(!response) {
        res.status(400).json({
            message: 'Invalid data'
        })
    } else{
        res.status(200).json({
            message: 'Program updated succesfully',
            program: response
        })
    }
}

const remove = (req, res) => {
    const id = req.params['program_id']

    console.log(id)
    const data = programControllers.deleteProgram(id)
    
    if (data) {
      return res.status(204).json();
    } else {
      return res.status(400).json({ message: "Invalid ID" });
    }
  };

const postCover = (req, res) => {
    const programId = req.params.program_id
    const imgPath = req.hostname + ':8000' + '/api/v1/uploads/anime/covers/' + req.file.filename 
    
    const response = programControllers.editCover(programId, imgPath)
    
    if(!response) {
        res.status(400).json({
            message: 'We should have a problem with the data'
        })
    }

    res.status(200).json(response)
  
  }

module.exports = {
    getPrograms,
    getProgramById,
    createProgram,
    edit,
    remove,
    postCover
}