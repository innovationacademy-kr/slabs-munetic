import { RequestHandler } from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../munetic_app/public/img');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + '-' + Date.now() + ext);
  },
});
const storageConfig = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    if (
      ext !== '.png' &&
      ext !== '.jpg' &&
      ext !== '.jpeg' &&
      ext !== '.gif' &&
      ext !== '.svg'
    ) {
      return callback(new Error('이미지 형식이 잘못됐습니다.'));
    }
    callback(null, true);
  },
});

export const imgUpload: RequestHandler = (req, res, next) => {
  return storageConfig.single('img')(req, res, next);
};
