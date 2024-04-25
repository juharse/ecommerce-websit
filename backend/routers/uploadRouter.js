import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});
uploadRouter.get('/:imageName', (req, res) => {
  const { imageName } = req.params;
  const imageUrl = `${req.protocol}://${req.get('host')}/images/${imageName}`;
  res.json({ imageUrl });
});

export default uploadRouter;
