const multer = require("multer");
const path = require("path");

const updateCover = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve("uploads/media/covers/"));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage });
  return upload;
};
const updateChapter = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve("uploads/media/chapters/"));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage });
  return upload;
};

const updateProfileImage = () => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve("uploads/media/profileImages/"));
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    });
  
    const upload = multer({ storage });
    return upload;
  };
module.exports = {
  updateChapter,
  updateCover,
  updateProfileImage
};
