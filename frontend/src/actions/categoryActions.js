// categoryActions.js
import axios from 'axios';

export const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: 'CATEGORY_LIST_REQUEST' });

    const { data } = await axios.get('https://ecommerce-websit-3.onrender.com/api/categories');

    dispatch({
      type: 'CATEGORY_LIST_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'CATEGORY_LIST_FAIL',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const addCategory = (name) => async (dispatch) => {
  try {
    dispatch({ type: 'CATEGORY_ADD_REQUEST' });

    const { data } = await axios.post('https://ecommerce-websit-3.onrender.com/api/categories', { name });

    dispatch({
      type: 'CATEGORY_ADD_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'CATEGORY_ADD_FAIL',
      payload: error.response && error.response.data.error ? error.response.data.error : error.message,
    });
  }
};

export const deleteCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: 'CATEGORY_DELETE_REQUEST' });

    await axios.delete(`https://ecommerce-websit-3.onrender.com/api/categories/${categoryId}`);

    dispatch({
      type: 'CATEGORY_DELETE_SUCCESS',
      payload: categoryId,
    });
  } catch (error) {
    dispatch({
      type: 'CATEGORY_DELETE_FAIL',
      payload: error.response && error.response.data.error ? error.response.data.error : error.message,
    });
  }
};
