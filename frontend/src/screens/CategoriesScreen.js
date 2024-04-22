import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories, addCategory, deleteCategory } from '../actions/categoryActions';

const CategoriesScreen = () => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const [newCategoryName, setNewCategoryName] = useState('');
  const [addCategoryError, setAddCategoryError] = useState('');

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== '') {
      dispatch(addCategory(newCategoryName));
      setNewCategoryName('');
      setAddCategoryError('');
    } else {
      setAddCategoryError('Category name cannot be empty');
    }
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategory(categoryId));
    }
  };

  return (
    <div>
      <h1>Categories</h1>
      <div>
        <h2>Add New Category</h2>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Enter category name"
        />
        <button onClick={handleAddCategory}>Add Category</button>
        {addCategoryError && <div>{addCategoryError}</div>}
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>
                  <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoriesScreen;
