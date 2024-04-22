const initialState = {
    subcategories: [],
    loading: false,
    error: null,
    success: false,
};

export const subcategoryListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUBCATEGORY_LIST_REQUEST':
            return { ...state, loading: true, error: null };
        case 'SUBCATEGORY_LIST_SUCCESS':
            return { ...state, loading: false, subcategories: action.payload, error: null };
        case 'SUBCATEGORY_LIST_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const subcategoryAddReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUBCATEGORY_ADD_REQUEST':
            return { ...state, loading: true, error: null, success: false };
        case 'SUBCATEGORY_ADD_SUCCESS':
            return { ...state, loading: false, success: true };
        case 'SUBCATEGORY_ADD_FAIL':
            return { ...state, loading: false, error: action.payload, success: false };
        default:
            return state;
    }
};

export const subcategoryDeleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUBCATEGORY_DELETE_REQUEST':
            return { ...state, loading: true, error: null, success: false };
        case 'SUBCATEGORY_DELETE_SUCCESS':
            return { ...state, loading: false, success: true };
        case 'SUBCATEGORY_DELETE_FAIL':
            return { ...state, loading: false, error: action.payload, success: false };
        default:
            return state;
    }
};
