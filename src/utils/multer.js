const multer = require("multer");
const path = require("path");

const uploadProfileImg = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve("uploads/profile_img"));
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        },
    });

    const upload = multer({ storage });
    return upload;
};

const updateCover = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve("media/covers"));
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-cover-" + file.originalname);
        },
    });

    const upload = multer({ storage });
    return upload;
};

const updateChapter = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve("media/chapters"));
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        },
    });

    const upload = multer({ storage });
    return upload;
};
module.exports = {
    uploadProfileImg,
    updateChapter,
    updateCover,
};
