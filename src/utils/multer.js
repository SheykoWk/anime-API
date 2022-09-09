const multer = require('multer')
const path = require('path')

const updateCover = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve('uploads/anime/covers'))
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
    
    const upload = multer({storage})
    return upload
}
const updateChapter = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve('uploads/anime/chapters'))
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
    
    const upload = multer({storage})
    return upload
}
module.exports = {
    updateChapter,
    updateCover
}
