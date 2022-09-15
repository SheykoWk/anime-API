const programsControllers = require('./programs.controller');

const getAllPrograms = (req, res) => {
    const data = programsControllers.getAllPrograms();
    res.status(200).json({items: data.length, programs: data});
};

const getProgramsById = (req, res) => {
    const id = req.params.id;
    const data = programsControllers.getProgramById();

    if (data) {
        res.status(200).json(data);
    } else {
        res.status(400).json({message: `The programs whtih ID ${id} dont found`})
    }
}

const registerPrograms = (req, res) => {
    const data = req.body;
    const file = req.file;

    if (!data) {
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
            season: "int",
            cover: "image-url",
            categories: "string"
    
          },
        });
      } else {
        const urlCover = `http://${req.hostname}:8000/media/covers/${req.file.filename}`
        const response = programsControllers.createProgram(data, urlCover);
        return res
          .status(201)
          .json({
            message: `Program created succesfully with id: ${response.id}`,
            program: response,
          });
      }
    };
    
    const removePrograms = (req, res) => {
      const id = req.params.id;
    
      if (id) {
        programsControllers.deleteProgram(id)
        return res.status(204).json();
      } else {
        return res.status(400).json({ message: "Invalid ID" });
      }
    };
    
    const editPrograms = (req, res) => {
      const id = req.params.programs_id;
      const data = req.body;
      if (!id) {
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
            seasons: "int",
            cover: "image-url",
            categories: "string",
          },
        });
      } else {
        const response = programsControllers.editProgram(id, data)
        return res.status(200).json({
          message: 'Anime edited succesfully',
          user: response
        })
      }
    };
    
    
    
    module.exports = {
        getAllPrograms,
        getProgramsById,
        registerPrograms,
        editPrograms,
        removePrograms
    };
