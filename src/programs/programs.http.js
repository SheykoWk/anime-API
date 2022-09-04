const programsControllers = require('./programs.controller');
const chaptersControllers = require('../chapters/chapters.controllers');

const getAll = (req, res) => {
  const response = programsControllers.getAllPrograms();

  res.status(200).json({ items: response.length, response });
}

const getById = (req, res) => {
  const id = req.params.programId;
  const response = programsControllers.getProgramById(id);

  if (response)
    return res.status(200).json(response)

  return res.status(404).json({ message: `The user with id:${id} doesn't exist` })
}

const addAProgram = (req, res) => {
  const data = req.body;

  if (!Object.keys(data).length)
    res.status(400).json({ message: 'Missing data' });

  if (!data.title || !data.description || !data.seasons || !data.categories) {
    res.status(400).json({
      message: 'You must have at least these fields',
      fields: {
        title: 'Your title',
        description: 'Your description',
        seasons: 3,
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
    return res.status(204).json();

  return res.status(400).json({ message: 'Invalid Id' })
}

const edit = (req, res) => {
  const id = req.params.programId;
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });

  }

  if (!data.title || !data.description || !data.seasons || !data.categories) {
    return res.status(400).json({
      message: 'You must have at least these fields',
      fields: {
        title: 'Your title',
        description: 'Your description',
        seasons: 3,
        categories: ['Accion,Comedia']
      }
    })
  }

  const response = programsControllers.editProgram(id, data);

  if (response) {
    return res.status(200).json({
      message: 'Program edited succesfully',
      response
    })
  }

  return res.status(400).json({
    message: 'Invalid Id'
  })

}

const uploadCoverProgam = (req, res) => {
  const programId = req.params.programId;
  const coverPath = req.hostname + ':8000' + '/api/v1/media/covers/' + req.file.originalname;

  const response = programsControllers.updateCoverProgram(programId, coverPath);

  if (!response)
    return res.status(404).json({ message: `The program with id ${programId} doesn't exist` });

  return res.status(200).json({ message: `The program with id: ${programId} was succesfully edited` })

}

const getChaptersByProgramId = (req, res) => {
  const programId = req.params.programId;
  const response = programsControllers.getAllChaptersOfProgramById(programId);
  if (response)
    return res.status(200).json(response)

  return res.status(400).json({ message: 'Invalid Id' })

}

const addChapterToProgramById = (req, res) => {
  const programId = req.params.programId;
  const data = req.body;

  console.log(req.file);

  const chapterPath = req.hostname + ':8000' + '/api/v1/media/chapters/' + req.file.originalname;
  const response = programsControllers.createChapterToProgramById(programId, chapterPath);

  if (response)
    return res.status(201).json({ message: `Chapter created succesfully with id:${response.id}`, response })

  return res.status(400).json({ message: 'Invalid id' });

}

const getAChapterByProgram = (req, res) => {
  const programId = req.params.programId;
  const chapterId = req.params.chapterId;
  const program = programsControllers.getProgramById(programId);

  if (!program)
    return res.status(404).json({ message: `The program with id:${programId} doesn't exist` });

  const response = chaptersControllers.getChapterById(chapterId);

  if (!response)
    return res.status(404).json({ message: `The chapter with id: ${chapterId} doesn't exist` });

  return res.status(200).json(response);

}

const removeAChapterByProgram = (req, res) => {
  const programId = req.params.programId;
  const chapterId = req.params.chapterId;
  const program = programsControllers.getProgramById(programId);

  if (!program)
    return res.status(404).json({ message: `The program with id:${programId} doesn't exist` });

  const response = chaptersControllers.deleteChapter(chapterId);

  if (!response)
    return res.status(400).json({ message: `The chapter with id ${chapterId} doesn't exist` });

  return res.status(204).json();

}

const editAChapterByProgramId = (req, res) => {
  const programId = req.params.programId;
  const chapterId = req.params.chapterId;
  const program = programsControllers.getProgramById(programId);
  const data = req.body;
  if (!program)
    return res.status(404).json({ message: `The program with id:${programId} doesn't exist` });

  const chapterPath = req.hostname + ':8000' + '/api/v1/media/chapters/' + req.file.originalname;
  data.url = chapterPath;

  const response = chaptersControllers.editChapter(chapterId, data);

  if (response)
    return res.status(200).json({ message: 'Chapter edited succesfully' })

  return res.status(404).json({ message: `The chapter with id ${chapterId} doesn't exist` });
}

module.exports = {
  getAll,
  addAProgram,
  getById,
  remove,
  edit,
  uploadCoverProgam,
  addChapterToProgramById,
  getChaptersByProgramId,
  getAChapterByProgram,
  removeAChapterByProgram,
  editAChapterByProgramId
}