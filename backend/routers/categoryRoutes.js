import express from 'express';
import Category from '../models/categoryModel.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';

const categoryRouter = express.Router();

// Route to get all categories
/*categoryRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
      // await User.remove({});
      const createdcategory = await Category.insertMany(data.categories);
      res.send({ createdcategory });
    })
  );*/
  categoryRouter.get('/', async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  });
// Route to add a new category
categoryRouter.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add category' });
  }
});

// Route to delete a category by ID
categoryRouter.delete('/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    await Category.findByIdAndDelete(categoryId);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

export default categoryRouter;
