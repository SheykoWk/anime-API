const programsControllers = require('./programs.controller');

const getAll = (req, res) => {
  const response = programsControllers.getAllPrograms();

  res.status(200).json({ items: response.length, response });
}

const getById = (req, res) => {
  const id = req.params.programId;
  const response = programsControllers.getProgramById(id);

  if (response.length)
    res.status(200).json(response)

  res.status(404).json({ message: `The user with id:${id}doesn't exist` })
}

const addAProgram = (req, res) => {
  const data = req.body;

  if (!Object.keys(data).length)
    res.status(400).json({ message: 'Missing data' });

  if (!data.title || !data.description || !data.seasons || !data.cover || !data.categories) {
    res.status(400).json({
      message: 'You must have at least these fields',
      fields: {
        title: 'Your title',
        description: 'Your description',
        seasons: 3,
        cover: 'example.com/img/example.png',
        categories: ['Accion,Comedia']
      }
    })
  }

  const response = programsControllers.createProgram(data);
  res.status(201).json({
    message: `Program created succesfully with id ${response.id}`,
    program: response
  })

}

const remove = (req, res) => {
  const id = req.params.programId;
  const response = programsControllers.deleteProgram(id);

  if (response)
    res.status(204).json();

  res.status(400).json({ message: 'Invalid Id' })
}

const edit =(req,res)=>{
  const id =req.params.programId;
  const data = req.body;

  if (!Object.keys(data).length)
    res.status(400).json({ message: 'Missing data' });

  const response =programsControllers.editProgram(id,data);

  if(response){
    res.status(200).json({
      message:'User edited succesfully',
      response
    })
  }

  res.status(400).json({
    message:'Invalid Id'
  })
    
}

const getChaptersByProgramId =(req,res)=>{
  const programId =req.params.programId;
  const response = programsControllers.getAllChaptersOfProgramById(programId);
  if(response)
    return res.status(200).json(response)

  //else{
  return res.status(400).json({message:'Invalid Id'})

  //}
  
}



const addChapterToProgramById=(req,res)=>{
  const programId =req.params.programId;
  const data =req.body;

  if (!Object.keys(data).length)
    res.status(400).json({ message: 'Missing data' });
  
  if(!req.file.filename)
    res.status(400).json({message:'You must upload a file'});

  const chapterPath =req.hostname+':8000'+'/api/v1/uploads'+req.file.filename;
  const response =programsControllers.addAChapterToProgramById(programId,chapterPath);

  if(response)
    res.status(201).json({message:`Chapter created succesfully with id:${response.id}`,response})
  
  res.status(400).json({message:'Invalid id'});

}

module.exports = {
  getAll,
  addAProgram,
  getById,
  remove,
  edit,
  addChapterToProgramById,
  getChaptersByProgramId
}