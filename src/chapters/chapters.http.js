const { port } = require("../config");
const chapterControllers = require("./chapters.controllers");
const programControllers = require("../programs/programs.controller");

const getByProgram = (req, res) => {
    const id = req.params.program_id;
    console.log(id);
    let programData = programControllers.getProgramById(id);

    if (!programData) {
        return res.status(404).json({ message: "Invalid ID" });
    }
    const chaptersData = chapterControllers.getChaptersByProgram(id);

    programData = { ...programData, chapters: chaptersData };
    return res.status(200).json(programData);
};

const add = (req, res) => {
    const programId = req.params.program_id;
    const body = req.body;

    if (!programControllers.getProgramById(programId)) {
        return res.status(404).json({ message: "Program doesn't exist" });
    } else if (!Object.keys(body).length) {
        return res.status(400).json({ message: "Missing data" });
    } else if (!body.chapter_num) {
        return res.status(400).json({
            message: "All fields must be filled",
            fields: { chapter_num: "number" },
        });
    } else {
        const data = chapterControllers.createChapter(body, programId);
        return res
            .status(201)
            .json({ message: "Chapter added succesfully!", chapter: data });
    }
};

//* "/api/v1/programs/:program_id/chapters/:chapter_id"

const getById = (req, res) => {
    const id = req.params.chapter_id;
    const data = chapterControllers.getChapterById(id);

    return data
        ? res.status(200).json(data)
        : res.status(404).json({ message: "Chapter doesn't exist" });
};

const edit = (req, res) => {
    const id = req.params.chapter_id;
    const body = req.body;

    if (!Object.keys(body).length) {
        return res.status(400).json({ message: "Missing Data" });
    }
    const data = chapterControllers.editChapter(id, body);
    return data
        ? res
              .status(200)
              .json({ message: "Chapter edited succesfully!", chapter: data })
        : res.status(404).json({ message: "Chapter doesn't exist" });
};

const remove = (req, res) => {
    const id = req.params.chapter_id;
    const data = chapterControllers.deleteChapter(id);

    return data
        ? res.status(204).json()
        : res.status(404).json({ message: "Chapter doesn't exist" });
};

const editMedia = (req, res) => {
    const id = req.params.chapter_id;
    const mediaPath = `${req.hostname}:${port}/api/v1/media/chapters/${req.file.filename}`;
    const data = chapterControllers.editChapterMedia(id, mediaPath);

    return data
        ? res
              .status(200)
              .json({ message: "Media updated succesfully!", chapter: data })
        : res.status(400).json({ message: "Invalid ID." });
};

module.exports = {
    getByProgram,
    add,
    getById,
    edit,
    remove,
    editMedia,
};
