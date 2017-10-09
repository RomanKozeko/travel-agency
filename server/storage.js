import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './client/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null,  Date.now() + file.originalname);
  }
});

export default storage;