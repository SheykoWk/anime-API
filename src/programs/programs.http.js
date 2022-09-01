const programsControllers = require('./programs.controller');

const getAll = (req, res) => {
    try {
        const data = programsControllers.getAllPrograms();
        res.status(200).json(data);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const create = (req, res) => {
    try {
        const data = req.body;

        if (!Object.keys(data).length && !req.file) throw { message: 'Missing data', status: 400 };
        
        if (!data.title || !data.description || !data.seasons || !data.categories || !req.file) {
            throw {
                message: "All fields must be completed",
                fields: {
                    title: "string",
                    description: "string",
                    seasons: "number",
                    cover_img: "image file (.png|.jpg|.webp)",
                    categories: ["Category1", "Category2", "Category3"]
                },
                status: 400
            }
        };
        
        // Tratamiento de datos
        if (!Array.isArray(data.categories)) data.categories = JSON.parse(data.categories);
        data.seasons = +data.seasons;
        data.cover = `${req.hostname}:8000/uploads/animes/${req.file.filename}`;

        const newProgram = programsControllers.createProgram(data);
        res.status(201).json(newProgram);

    } catch (error) {
        res.status(error.status || 500).json({ message: error.message, fields: error.fields || null });
    }
};

const getOne = (req, res) => {
    try {
        const { id } = req.params;
        const program = programsControllers.getProgramById(id);

        res.status(200).json(program);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const edit = (req, res) => {
    try {
        const data = req.body;
        const { id } = req.params;

        if (!Object.keys(data).length && !req.file) throw { message: 'Missing data', status: 400 };

        if (!data.title && !data.description && !data.seasons && !data.categories && !req.file) {
            throw {
                message: "At least one of the fields must be one of the following",
                fields: {
                    title: "string",
                    description: "string",
                    seasons: "number",
                    cover_img: "image file (.png|.jpg|.webp)",
                    categories: ["Category1", "Category2", "Category3"]
                },
                status: 400
            }
        };

        // Tratamiento de datos
        if (data.categories && !Array.isArray(data.categories)) data.categories = JSON.parse(data.categories);
        data.seasons = data.seasons && +data.seasons;
        data.cover = req.file && `${req.hostname}:8000/uploads/animes/${req.file.filename}`;

        // Respuesta
        const editedProgram = programsControllers.editProgram(id, data);
        res.status(200).json({ message: "Program was sucesfully edited", editedProgram });

    } catch (error) {
        res.status(error.status || 500).json({ message: error.message, fields: error.fields || null });
    }
};

const remove = (req, res) => {
    try {
        const { id } = req.params;
        programsControllers.deleteProgram(id);

        res.status(204).json({});
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

module.exports = {
    getAll,
    create,
    getOne,
    edit,
    remove
}