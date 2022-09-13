const multer = require("multer");
const path = require("path");

const storageCovers = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("uploads/media/covers"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const storageChapters = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("uploads/media/episodes"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadCovers = multer({ storage: storageCovers });
const uploadChapters = multer({ storage: storageChapters });

const updateCovers = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve("uploads/media/covers"));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage });
  return upload;
};

const updateChapters = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve("uploads/media/chapters"));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage });
  return upload;
};

module.exports = {
  updateChapters,
  updateCovers,
  uploadCovers,
  uploadChapters,
};
