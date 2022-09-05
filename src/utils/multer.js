const multer = require('multer')
const path = require('path')

// const coversStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.resolve('media/covers'))
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// })

// const chaptersStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.resolve('media/chapters'))
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// })

// const uploadCovers = multer({storage: coversStorage})
// const uploadChapters = multer({storage: chaptersStorage})

// module.exports = {
//     uploadChapters,
//     uploadCovers
//  }

const updateCover = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve('media/covers'))
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
            cb(null, path.resolve('media/chapters'))
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