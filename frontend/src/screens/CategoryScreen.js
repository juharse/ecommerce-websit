// CategoryScreen.js
import React from 'react';
import { Route } from 'react-router-dom';
//import ProductListBySubcategoryScreen from '../components/ProductListByCategory';
import ProductListBySubcategoryScreen from '../components/ProductListByCategory';

const CategoryScreen = () => {
  return (
    <div>
      <Route
        path="/subcategory/:subcategoryId"
        component={ProductListBySubcategoryScreen}
      />
    </div>
  );
};

export default CategoryScreen;
