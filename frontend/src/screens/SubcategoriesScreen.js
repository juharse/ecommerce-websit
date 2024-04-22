import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from '../actions/categoryActions';
import { listSubcategories, addSubcategory, deleteSubcategory } from '../actions/subcategoryActions';

const SubcategoriesScreen = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categoryList = useSelector(state => state.categoryList);
  const { categories } = categoryList;

  const subcategoryList = useSelector(state => state.subcategoryList);
  const { loading, error, subcategories } = subcategoryList;

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listSubcategories());
  }, [dispatch]);

  const handleAddSubcategory = (e) => {
    e.preventDefault();
    if (name && selectedCategory) {
      dispatch(addSubcategory(name, selectedCategory));
      setName('');
    }
  };

  const handleDeleteSubcategory = (id) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      dispatch(deleteSubcategory(id));
    }
  };

  return (
    <div>
      <h1>Manage Subcategories</h1>
      <form onSubmit={handleAddSubcategory}>
        <label htmlFor="categorySelect">Choose a category:</label>
        <select
          id="categorySelect"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="subcategoryName">Subcategory Name:</label>
        <input
          type="text"
          id="subcategoryName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button type="submit">Add Subcategory</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {subcategories.map(subcategory => (
            <li key={subcategory._id}>
              {subcategory.name} - {subcategory.category?.name}
              <button onClick={() => handleDeleteSubcategory(subcategory._id)} style={{marginLeft:30}}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubcategoriesScreen;
