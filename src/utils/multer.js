const multer = require('multer')
const path = require('path')
const uuid4 = require('uuid').v4;

const genStorage = dir => multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            cb(null, path.resolve(`media/${dir}`))
        } catch (error) {
            cb(error)
        }
    },
    filename: (req, file, cb) => {
        try {
            cb(null, uuid4() + '.' + file.originalname)
        } catch (error) {
            cb(error)
        }
    }
});

const uploadCovers = multer({ storage: genStorage('covers') });
const uploadChapters = multer({ storage: genStorage('chapters') });

const updateCover = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve('uploads/covers'))
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
    
    const upload = multer({storage})
    return upload
}
const updateChapter = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve('uploads/chapters'))
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
    
    const upload = multer({storage})
    return upload
}

module.exports = {
    updateChapter,
    updateCover,
    uploadCovers,
    uploadChapters
}