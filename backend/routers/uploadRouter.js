import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';
import { promises as fs } from 'fs';
import path from 'path';

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
/*uploadRouter.get('/:imageName', (req, res) => {
  const { imageName } = req.params;
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${imageName}`;
  res.json({ imageUrl });
});*/
uploadRouter.get('/:imageName', async (req, res) => {
  const { imageName } = req.params;

  try {
    // Assuming images are stored in the 'images' directory
    const imagePath = path.join(__dirname, './uploads', imageName);

    // Read the image file
    const imageData = await fs.readFile(imagePath);

    // Set the content type header
    res.setHeader('Content-Type', 'image/jpg'); // Adjust the content type based on your image format

    // Send the image data as the response
    res.send(imageData);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(404).json({ error: 'Image not found' });
  }
});

export default uploadRouter;
