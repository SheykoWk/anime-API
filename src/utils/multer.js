const multer = require('multer')
const path = require('path')

const coverStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('uploads/media/covers'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const ChapterStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('uploads/media/chapters'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const uploadCovers = multer({coverStorage})
const uploadChapters = multer({ChapterStorage})

module.exports = { uploadChapters, uploadCovers }



















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
    updateCover
}