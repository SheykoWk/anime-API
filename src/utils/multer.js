const multer = require('multer')
const path = require('path')

const uploadCoverUser =()=>{
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve('upload/covers/'))
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
    const upload = multer({ storage });
    return upload;


}
    
const uploadCoverProgram = () => {
    const storageMediaCovers = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve('media/covers/'))
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
    const upload = multer({ storage:storageMediaCovers });
    return upload;
}

const uploadChapter = () => {
    const storageMediaChapters = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve('media/chapters/'))
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
    const upload = multer({ storage:storageMediaChapters });    
    return upload;

}

module.exports = {
    uploadCoverUser,
    uploadCoverProgram,
    uploadChapter
}