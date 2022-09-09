const e = require('express')
const programsControllers = require('./programs.controller')

const getAll = (req, res) => {
    const data = programsControllers.getAllPrograms()
    if (data) {
        return res.status(200).json(data)
    } else {
        return res.status(400).json({ message: 'Error' })
    }
}

const getById = (req, res) => {
    const id = req.params.program_id
    const data = programsControllers.getProgramById(id)
    if (data) {
        return res.status(200).json(data)
    } else {
        return res.status(404).json({ message: `The program with the id ${id} does not exist` })
    }
}
const register = (req, res) => {
    const data = req.body
    if (!Object.keys(data)) {
        return res.status(400).json({ message: 'Missing data' })
    } else if (
        !data.title ||
        !data.description ||
        !data.seasons ||
        !data.categories) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                title: 'string',
                description: 'string',
                seasons: 'number',
                categories: 'array',
            }
        })
    } else if (!data.categories[0] || typeof (data.categories) === 'string') {
        return res.status(400).json({ message: 'categories not is a array' })
    } else if (
        typeof (data.seasons) !== 'number'
    ) {
        return res.status(400).json({ message: 'season not is a number' })
    } else {
        parseInt(data.seasons)
        const body = programsControllers.createProgram(data)
        return res.status(201).json({ message: `Program created succesfully wuth id: ${body.id}`, program: body })
    }
}

const remove = (req, res) => {
    const id = req.params.program_id
    const data = programsControllers.deleteProgram(id)
    if (data) {
        return res.status(204).json({ message: 'Delete sucessfully' })
    } else {
        return res.status(400).json({ message: 'Invalid id' })
    }
}

const edit = (req, res) => {
    const id = req.params.program_id
    const data = req.body
    if (!Object.keys(data)) {
        return res.status(400).json({ message: 'Missing data' })
    } else if (
        !data.title ||
        !data.description ||
        !data.seasons ||
        !data.categories) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                title: 'string',
                description: 'string',
                seasons: 'number',
                categories: 'array',
            }
        })
    } else if (!data.categories[0] || typeof (data.categories) === 'string') {
        return res.status(400).json({ message: 'categories not is a array' })
    } else if (
        typeof (data.seasons) !== 'number'
    ) {
        return res.status(400).json({ message: 'season not is a number' })
    } else {
        console.log(typeof (data.seasons))
        parseInt(data.seasons)
        const body = programsControllers.editProgram(id, data)
        return res.status(201).json({ message: `Program created succesfully wuth id: ${body.id}`, program: body })
    }
}

const postCoverPrograms = (req, res) => {
    const id = req.params.program_id
    const coverUrl = req.hostname + ':8000' + '/uploads/animes/' + req.file.filename

    const data = programsControllers.editCoverPrograms(id, coverUrl)
    if (data) {
        return res.status(200).json(data)
    } else {
        console.log(data)
        return res.status(400).json({ message: `The program with the id ${id} does not exist` })
    }
}
module.exports = {
    getAll,
    getById,
    register,
    remove,
    edit,
    postCoverPrograms
}