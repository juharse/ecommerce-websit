import express from 'express';
import Subcategory from '../models/subcategoryModel.js';
import expressAsyncHandler from 'express-async-handler';
//import express from 'express';
//import Category from '../models/categoryModel.js';
//import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js'
const subcategoryRouter = express.Router();

// Route to get all subcategories
/*subcategoryRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
      // await User.remove({});
      const createdsubcategory = await Subcategory.insertMany(data.subcategories);
      res.send({ createdsubcategory });
    })
  );*/
  subcategoryRouter.get('/', async (req, res) => {
    try {
      const categories = await Subcategory.find().populate('category');
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  });

// Route to add a new subcategory
subcategoryRouter.post('/', async (req, res) => {
  try {
    const { name, category } = req.body;
    const subcategory = await Subcategory.create({ name, category });
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add subcategory' });
  }
});

// Route to delete a subcategory by ID
subcategoryRouter.delete('/:subcategoryId', async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    await Subcategory.findByIdAndDelete(subcategoryId);
    res.json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete subcategory' });
  }
});

export default subcategoryRouter;
