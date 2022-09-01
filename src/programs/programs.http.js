const programsControllers = require('./programs.controller');

const getAll = (req, res) => {
    const data = programsControllers.getAllPrograms();
    return res.status(200).json({ items: data.length, programs: data });
};

const getById = (req, res) => {
    const id = req.params.id;
    const data = programsControllers.getProgramById(id);

    if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: `Program with the id ${id} doesn't exist` });
      }
      return data
    };

const create = (req, res) => {
        const data = req.body;
        if (!data) {
          return res.status(400).json({ message: "Missing Data" });
        } else if (
          !data.title ||
          !data.description ||
          !data.seasons ||
          !data.covers ||
          !data.categories 
        ) {
          return res.status(400).json({
            message: "All fields must be completed",
            fields: {
              title: "string",
              description: "string",
              seasons: 4,
              cover: "example.com/img/example.png",
              categories: "string"
            },
          });
        } else {
          const response = programsControllers.createProgram(data);
          return res
            .status(201)
            .json({
              message: `Program created successfully with id: ${response.id}`,
              program: response,
            });
        }
      };

const edit = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    if (!Object.keys(data).length) {
        return res.status(400).json({ message: "Missing Data" });
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
              seasons: 4,
              cover: "example.com/img/example.png",
              categories: "string"
            },
          });
        } else {
          const response = programsControllers.editProgram(id, data)
          return res.status(200).json({
            message: 'Program edited succesfully',
            program: response
          })
        }
      };

const remove = (req, res) => {
    const id = req.params.id;
    const data = programsControllers.deleteProgram(id);
      
    if (data) {
        return res.status(204).json({ message: `Deleted program with id: ${id}` });
      } else {
        return res.status(400).json({ message: "Invalid ID" });
      }
    };

    module.exports = {
        getAll,
        getById,
        create,
        edit,
        remove
    }