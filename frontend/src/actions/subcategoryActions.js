import axios from 'axios';

// Action Types
export const SUBCATEGORY_LIST_REQUEST = 'SUBCATEGORY_LIST_REQUEST';
export const SUBCATEGORY_LIST_SUCCESS = 'SUBCATEGORY_LIST_SUCCESS';
export const SUBCATEGORY_LIST_FAIL = 'SUBCATEGORY_LIST_FAIL';
export const SUBCATEGORY_ADD_REQUEST = 'SUBCATEGORY_ADD_REQUEST';
export const SUBCATEGORY_ADD_SUCCESS = 'SUBCATEGORY_ADD_SUCCESS';
export const SUBCATEGORY_ADD_FAIL = 'SUBCATEGORY_ADD_FAIL';
export const SUBCATEGORY_DELETE_REQUEST = 'SUBCATEGORY_DELETE_REQUEST';
export const SUBCATEGORY_DELETE_SUCCESS = 'SUBCATEGORY_DELETE_SUCCESS';
export const SUBCATEGORY_DELETE_FAIL = 'SUBCATEGORY_DELETE_FAIL';

// Action to fetch subcategories
export const listSubcategories = () => async (dispatch) => {
    try {
        dispatch({ type: SUBCATEGORY_LIST_REQUEST });
        const { data } = await axios.get('https://ecommerce-websit-3.onrender.com/api/subcategories');
        dispatch({ type: SUBCATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SUBCATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Action to add a new subcategory
export const addSubcategory = (name, category) => async (dispatch) => {
    try {
        dispatch({ type: SUBCATEGORY_ADD_REQUEST });
        const { data } = await axios.post('https://ecommerce-websit-3.onrender.com/api/subcategories', { name, category });
        dispatch({ type: SUBCATEGORY_ADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SUBCATEGORY_ADD_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Action to delete a subcategory
export const deleteSubcategory = (subcategoryId) => async (dispatch) => {
    try {
        dispatch({ type: SUBCATEGORY_DELETE_REQUEST });
        await axios.delete(`https://ecommerce-websit-3.onrender.com/api/subcategories/${subcategoryId}`);
        dispatch({ type: SUBCATEGORY_DELETE_SUCCESS });
    } catch (error) {
        dispatch({
            type: SUBCATEGORY_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
