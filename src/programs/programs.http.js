const programsControllers = require('./programs.controller')




const getAll = (req, res) =>{
    const data = programsControllers.getAllPrograms();
    res.status(200).json({ items: data.length, programs: data });
}






const getById = (req, res) => {
    
    const id = req.params.program_id;
    
    const data = programsControllers.getProgramById(id);
  
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: `El programa con el id ${id} no existe` });
    }
  };


  const CreateProgram = (req, res) => {
    const data = req.body;
    if (!data) {
      return res.status(400).json({ message: "Missing Data" });
    } else if (
      !data.title ||
      !data.description ||
      !data.frontpageimage||
      !data.season ||
      !data.cover ||
      !data.categories
    ) { 
      return res.status(400).json({
        message: "All fields must be completed",
        fields: {
          title: "string",
          description: "string",
          frontpageimage : "www.dfgd.com",
          season:3,
          cover:"localhost:8000/uploads/animes/bnha-cover.jpg",
          categories: ["Accion", "Drama"]
        
        },
      });
    } else {
      const response = programsControllers.createProgram(data);
      return res
        .status(201)
        .json({
          message: `Program created succesfully with id: ${response.id}`,
          program: response,
        });
    }
  };



  const editProgram = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    if (!Object.keys(data).length) {
      return res.status(400).json({ message: "Missing Data" });
    } else if (
      !data.title ||
      !data.description ||
      !data.frontpageimage||
      !data.season ||
      !data.cover ||
      !data.categories
    ) {
      return res.status(400).json({
        message: "All fields must be completed",
        fields: {
          title: "string",
          description: "string",
          frontpageimage: "www.jskdjkdcom",
          season:3,
          cover:"localhost:8000/uploads/animes/bnha-cover.jpg",
          categories: ["Accion", "Drama"]
        },
      });
    } else {
      const response = programsControllers.editProgram(id, data)
      return res.status(200).json({
        message: 'program edited succesfully',
        program: response
      })
    }
  };


  const deleteProgram = (req, res) => {
    const id = req.params.program_id;
    console.log(typeof(id))
    const data = programsControllers.deleteProgram(id);
  
    if (data) {
      return res.status(204).json();
    } else {
      return res.status(400).json({ message: "Invalid ID" });
    }
  };

  

  const postFrontPagaeProgram = (req, res) => {
    const program_id = req.params.program_id;
    console.log(req.param)
    const url = req.hostname + ':8000' + '/api/v1/uploads/' + req.file.filename
  
    const data = programsControllers.editFrontPageProgram(program_id, url)
    res.status(200).json(data)
  
  }


  module.exports={
    CreateProgram,
    deleteProgram,
    editProgram,
    getAll,
    getById,
    postFrontPagaeProgram
    
  }