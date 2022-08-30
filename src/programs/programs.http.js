const programsControllers = require('./programs.controller');

const getAll = (req, res) => {
  const response = programsControllers.getAllPrograms();

  res.status(200).json({ items: response.length, response });
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
        cover:'example.com/img/example.png',
        categories: ['Accion,Comedia']
      }
    })
  }

  const response = programsControllers.createProgram(data);
  res.status(201).json({
    message:`Program created succesfully with id ${response.id}`,
    program:response
  })

}

module.exports = {
  getAll,
  addAProgram
}