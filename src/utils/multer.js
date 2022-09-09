const multer = require('multer')
const path = require('path')

const updateCover = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve('uploads/animes'))
        },
        filename: (req, file, cb) => {
            cb(null,file.originalname)
        }
    })

    const upload = multer({ storage })
    return upload
}
const updateChapters = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve('uploads/anime/chapters'))
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })

    const upload = multer({ storage })
    return upload
}
module.exports = {
    updateChapters,
    updateCover
}