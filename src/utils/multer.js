const multer = require('multer')
const path = require('path')

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.resolve('uploads/covers'))
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// })

// const upload = multer({storage}) 

// exports.upload = upload

// const updateCover = () => {
//     const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, path.resolve('uploads/covers'))
//         },
//         filename: (req, file, cb) => {
//             cb(null, Date.now() + '-' + file.originalname)
//         }
//     })
    
//     const upload = multer({storage})
//     return upload
// }

// const updateChapter = () => {
//     const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, path.resolve('uploads/chapters'))
//         },
//         filename: (req, file, cb) => {
//             cb(null, Date.now() + '-' + file.originalname)
//         }
//     })
    
//     const upload = multer({storage})
//     return upload
// }
// module.exports = {
//     updateChapter,
//     updateCover
// }

// const multer = require('multer');
// const path = require(`path`)

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.resolve('uploads/covers'))
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + `-` + file.originalname)
    }
},
console.log(`entroooooooooooooooo`)
)

const storage2 = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.resolve('uploads/chapters'))
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + `-` + file.originalname)
    }
},
console.log(`dentruuuuuuuuuuuuuuuuu`)
)

const updateChapter = multer({storage2}) 
const updateCover = multer({storage}) 

module.exports = {
    updateCover,
    updateChapter
}