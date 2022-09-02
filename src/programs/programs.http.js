 const programsController = require(`./programs.controller`)

 const getAll = (req, res) => {
    const data =  programsController.getAllPrograms()
    res.status(200).json({items: data.length, users: data})
 }

 const registerProgram = (req, res) => {
    const data = req.body;
    

    if (!data) {
        return res.status(400).json({ message: "Missing Data" });
      } else if (
        !data.title,
        !data.description,
        !data.seasons,
        !data.cover,
        !data.categories
      ) {
        return res.status(400).json({
          message: "All fields must be completed",
          fields: {
            title: "string",
            description: "string",
            season: "number",
            cover: "string",
            categories: ["string", "string", "string"]
          },
        });
      } else {
        const response = programsController.createProgram(data)
        return res.status(201).json({ 
                message: `User created succesfully with id: ${response.id}`,
                user: response,
            }); 
      }
}


const getById = (req, res) => {
    const program_id = req.params.program_id;

    

    const data = programsController.getProgramById(program_id);

    if(data){
        res.status(200).json(data)
    }else{
        res.status(404).json({message: "user does not exist"})        
    }
}

const editProgram = (req, res) => {
    const program_id = req.params.program_id;
    const data = req.body;

    if (!Object.keys(data).length) {
        return res.status(400).json({ message: "Missing Data" });
      } else if (
        !data.title,
        !data.description,
        !data.seasons,
        !data.cover,
        !data.categories
      ) {
        return res.status(400).json({
          message: "All fields must be completed",
          fields: {
            title: "string",
            description: "string",
            season: "number",
            cover: "string",
            categories: ["string", "string", "string"]
          },
        });
      } else {
        const response = programsController.editProgram(program_id, data)
        return res.status(200).json({ 
                message: `User created succesfully with id: ${response.id}`,
                user: response,
            }); 
      }
}

const remove = (req, res) => {
    const program_id = req.params.program_id;
    const data = programsController.deleteProgram(program_id);

    if(data){
        return res.status(204).json([{message: "treu"}])
    }else{
        return res.status(400).json({message: `Invalid ID`})
    }

}




 module.exports = {
    getAll,
    registerProgram,
    getById,
    editProgram,
    remove
 }