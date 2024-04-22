// categoryReducers.js
const initialState = {
    categories: [],
    loading: false,
    error: null,
    success: false,
  };
  
  export const categoryListReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CATEGORY_LIST_REQUEST':
        return { ...state, loading: true, error: null };
      case 'CATEGORY_LIST_SUCCESS':
        return { ...state, loading: false, categories: action.payload, error: null };
      case 'CATEGORY_LIST_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const categoryAddReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CATEGORY_ADD_REQUEST':
        return { ...state, loading: true, error: null, success: false };
      case 'CATEGORY_ADD_SUCCESS':
        return { ...state, loading: false, success: true };
      case 'CATEGORY_ADD_FAIL':
        return { ...state, loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };
  
  export const categoryDeleteReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CATEGORY_DELETE_REQUEST':
        return { ...state, loading: true, error: null, success: false };
      case 'CATEGORY_DELETE_SUCCESS':
        return { ...state, loading: false, success: true };
      case 'CATEGORY_DELETE_FAIL':
        return { ...state, loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };
  