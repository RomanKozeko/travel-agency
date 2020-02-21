import multer from 'multer';
import fs from 'fs';

const ensureExists = folderPath => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  return folderPath;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ensureExists('./client/uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname.replace(' ', '-'));
  },
});

export default storage;
