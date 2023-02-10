import multer from 'multer';
import ApiError from '../utils/ApiError.js';
import { v4 as uuid4 } from 'uuid';
import path from 'path';
// create storage configration.

const multerOptions = folderPath => {
  // desk storage
  const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderPath}`);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);

      const fileName = `${uuid4()}-${Date.now()}${ext}`;
      // uuid4-ISODATE-originalExtension
      req.body.file = `uploads/${folderPath}/${fileName}`;
      cb(null, fileName);
    },
  });

  const multerFilter = (req, file, cb) => {
    const filetypes = /pdf|docx|pptx|csv|xlsx|txt/;
    const isImage = file.mimetype.startsWith('image');
    const isOfficeFile = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (isImage || isOfficeFile) {
      // cb is like next in express, this inputs to it tells it that all is ok and continue.

      cb(null, true);
    } else {
      if (req.file) {
        fs.unlink(req.file.path, err => {
          if (err) {
            console.log('error');
          }
        });
      }
      cb(
        new ApiError(
          'only images and docx, pptx, csv, xlsx files are allowed',
          400
        ),
        false
      );
    }
  };

  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });
  return upload;
};

export const uploadSingleFile = (folderPath, fileName) =>
  multerOptions(folderPath).single(fileName);

// export const uploadMultipleFiles = fields => multerOptions().fields(fields);
