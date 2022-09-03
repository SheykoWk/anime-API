const chaptControllers = require('./chapters.controllers')

const getChapByProg = (req, res) => {
    const id = req.params.program_id;
    const data = chaptControllers.getChaptersByProgram(id, id);
    if(data){
        return res.status(200).json(data)
    }else{
        return res.status(404).json({message: 'There is nothing to show here'})
    }
}

const getChapById = (req, res) => {
    const id = req.params.chapter_id;

    const data = chaptControllers.getChapterById(id);
    if(data){
        return res.status(200).json(data)
    }else{
        return res.status(404).json({message: 'There is no chapter'})
    }
}

const createChap = (req, res) => {
    const data = req.body;
    const progmsId = req.params.program_id;
    const file = req.file;

    if(!data && !file){
        return res.status(400).json({message: 'Missing Data'})
    }else{
        const urlMp = `http://${req.hostname}:8000/uploads/anime/chapters/${req.file.filename}`
        const response = chaptControllers.createChapter(data, progmsId, urlMp);
        return res.status(201).json(response);
    }
}

const deleteChap = (req, res) => {
    const chapId = req.params.chapter_id;
    if(!chapId){
        return res.status(400).json({message: `There is no chapter with this ${chapId}`})
    }else{
        chaptControllers.deleteChapter(chapId);
        res.status(200).json()
    }
}

const putChap = (req, res) => {
    const chapId = req.params.chapter_id;
    const data = req.body;

    if(!data){
        return res.status(400).json({message: 'Missing Data'})
    }else if(
        !data.program_id ||
        !data.chapter_num ||
        !data.url
    ){
        return res.status(404).json({message: 'No fields may remain unchanged',
        fields: {
            program_id: 'int',
            chapter_num: 'int',
            url: 'ruta-capitulo'
        }
    })
    }else{
        const response = chaptControllers.editChapter(chapId, data)
        return res.status(200).json(response)
    }
}

module.exports = {
    getChapByProg,
    getChapById,
    createChap,
    deleteChap,
    putChap,
}