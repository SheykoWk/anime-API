const programControllers = require("./programs.controller");
const { port } = require("../config");

//* "/"

const getAll = (req, res) => {
    const data = programControllers.getAllPrograms();
    res.status(200).json({ items: data.length, programs: data });
};

const create = (req, res) => {
    const body = req.body;
    if (!Object.keys(body).length) {
        return res.status(400).json({ message: "Missing Data" });
    } else if (
        !body.title ||
        !body.description ||
        !body.seasons ||
        !body.categories
    ) {
        return res.status(400).json({
            message: "All fields must be filled",
            fields: {
                title: "string",
                description: "string",
                seasons: "number",
                categories: "array",
            },
        });
    } else {
        const data = programControllers.createProgram(body);
        return res
            .status(201)
            .json({ message: "Program created succesfully!", program: data });
    }
};

//* "/:program_id"

const getById = (req, res) => {
    const id = req.params.program_id;
    const data = programControllers.getProgramById(id);
    return data
        ? res.status(200).json(data)
        : res.status(404).json({ message: "Program doesn't exist" });
};

const edit = (req, res) => {
    const id = req.params.program_id;
    const body = req.body;

    if (!Object.keys(body).length) {
        return res.status(400).json({ message: "Missing Data" });
    }
    const data = programControllers.editProgram(id, body);

    return data
        ? res
              .status(200)
              .json({ message: "Program edited succesfully!", program: data })
        : res.status(400).json({ message: "Invalid ID" });
};

const remove = (req, res) => {
    const id = req.params.program_id;
    const data = programControllers.deleteProgram(id);
    return data
        ? res.status(204).json()
        : res.status(400).json({ message: "Invalid ID" });
};

const editCover = (req, res) => {
    const id = req.params.program_id;

    const imgPath = `${req.hostname}:${port}/api/v1/media/covers/${req.file.filename}`;

    const data = programControllers.editProgramCover(id, imgPath);

    return data
        ? res
              .status(200)
              .json({ message: "Cover updated succesfully!", program: data })
        : res.status(400).json({ message: "Invalid ID." });
};

module.exports = {
    getAll,
    create,
    getById,
    edit,
    remove,
    editCover,
};
