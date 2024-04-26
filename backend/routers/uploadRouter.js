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
const __filename = new URL(import.meta.url).pathname;
console.log(__filename)
const __dirname = path.dirname(__filename);

async function fetchImage(imageName) {
  try {
    // Get the directory name of the current module
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    console.log('__dirname:', __dirname); // Log __dirname to verify the current directory

    // Assuming the 'uploads' folder is within the 'backend' directory
    const imagePath = path.join(__dirname, '..', '/uploads', imageName);
    console.log('imagePath:', imagePath); // Log imagePath to verify the constructed path

    // Read the image file
    const imageData = await fs.readFile(imagePath);

    return { success: true, data: imageData };
  } catch (error) {
    console.error('Error fetching image:', error);
    return { success: false, error: 'Image not found' };
  }
}
uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});
uploadRouter.get('/:imageName', (req, res) => {
  const { imageName } = req.params;
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${imageName}`;
  res.json({ imageUrl });
});
/*uploadRouter.get('/:imageName', async (req, res) => {
  const { imageName } = req.params;

  try {
    const result = await fetchImage(imageName);
    if (result.success) {
      // Set the appropriate content type header
      res.setHeader('Content-Type', 'image/jpg'); // Adjust the content type based on your image format
      // Send the image data as the response
      res.send(result.data);
    } else {
      // If fetching the image failed, return an error response
      res.status(404).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});*/


export default uploadRouter;
