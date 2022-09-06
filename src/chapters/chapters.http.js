const chapterControllers = require('./chapters.controllers');

const getAll = (req, res) => {
    const program_id = req.params.program_id;
    const data = chapterControllers.getChaptersByProgram(program_id);

    return res.status(200).json({ items: data.length, users: data });
  };

const getById = (req, res) => {
    const id = req.params.chapter_id;
    const data = chapterControllers.getChapterById(id)
  
    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ message: `El usuario con el id ${id} no existe` });
    }
  };

const newChapter = (req, res) => {
    const programId = req.params.program_id;
    const chapterURL = req.hostname + ':8000' + '/api/v1/uploads/anime/chapters/' + req.file.filename ;
    const data = {...req.body};
    if(data){
        const response = chapterControllers.createChapter(data, programId, chapterURL);

        if(response) {
            return res.status(200).json({
                message: `Chapter created succesfully with id: ${response.id}`,
                chapter: response
            })
        }
    }

    return res.status(400).json({
        message: 'Invalid data'
    })
}


const edit = (req, res) => {
    const id = req.params.chapter_id;
    const data = req.body;

    if(data.chapter_num === Number(data.chapter_num)){
        const response = chapterControllers.editChapter(id, data);

        if(response) {
            return res.status(200).json({
                message: 'Chapter edited succesfully',
                user: response
            })
        }
    }

    return res.status(400).json({ message: "Invalid Data" });
}

const remove = (req, res) => {
    const id = req.params.chapter_id;
    const response = chapterControllers.deleteChapter(id)

    if(response){
        return res.status(204).json()
    } else {
        return res.status(400).json({message: 'invalid id'})
    }
  }

module.exports = {
    getAll,
    getById,
    newChapter,
    edit,
    remove
}