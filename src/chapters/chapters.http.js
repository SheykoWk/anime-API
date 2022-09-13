const chaptersControllers = require('./chapters.controllers');
const programsControllers = require('./../programs/programs.controller');

const getChapters = (req, res) => {
    try {
        const { program_id } = req.params;
        const program = programsControllers.getProgramById(program_id);
        const chapters = chaptersControllers.getChaptersByProgram(program_id);

        res.status(200).json({ ...program, chapters });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const create = (req, res) => {
    try {
        const { program_id } = req.params;
        const data = req.body;
        const program = programsControllers.getProgramById(program_id);

        if (!Object.keys(data).length && !req.file) throw { message: 'Missing data', status: 400 };

        if (!data.chapter_num || !req.file) {
            throw {
                message: "All fields must be completed",
                fields: {
                    chapter_num: "number",
                    chapter_video: "video_file.mp4"
                },
                status: 400
            }
        };

        // Data treatment
        data.chapter_num = +data.chapter_num;
        data.url = `${req.hostname}:8000/uploads/anime/chapters/${req.file.filename}`;

        const newChapter = chaptersControllers.createChapter(data, program_id);
        res.status(201).json(newChapter);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message, fields: error.fields || null });
    }
};

const getOne = (req, res) => {
    try {
        const { program_id, chapter_id } = req.params;
        const program = programsControllers.getProgramById(program_id);
        const chapter = chaptersControllers.getChapterById(chapter_id);

        res.status(200).json(chapter);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const edit = (req, res) => {
    try {
        const { program_id, chapter_id } = req.params;
        const data = req.body;
        const program = programsControllers.getProgramById(program_id);

        if (!data.chapter_num && !req.file) {
            throw {
                message: "All fields must be completed",
                fields: {
                    chapter_num: "number",
                    chapter_video: "video_file.mp4"
                },
                status: 400
            }
        };

        // Data treatment
        data.chapter_num = data.chapter_num && +data.chapter_num;
        data.url = data.url && `${req.hostname}:8000/uploads/anime/chapters/${req.file.filename}`;

        const editedChapter = chaptersControllers.editChapter(chapter_id, data);
        res.status(200).json({ message: "Chapter was succesfully edited", editedChapter });

    } catch (error) {
        res.status(error.status || 500).json({ message: error.message, fields: error.fields || null });
    }
};

const remove = (req, res) => {
    try {
        const { program_id, chapter_id } = req.params;
        const program = programsControllers.getProgramById(program_id);
        chaptersControllers.deleteChapter(chapter_id);

        res.status(204).json({});
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

module.exports = {
    getChapters,
    create,
    getOne,
    edit,
    remove
}