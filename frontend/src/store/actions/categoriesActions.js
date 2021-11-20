import axios from "axios";

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const fetchCategoriesRequest = () => ({type: FETCH_CATEGORIES_REQUEST});
export const fetchCategoriesSuccess = categories => ({type: FETCH_CATEGORIES_SUCCESS, payload: categories});
export const fetchCategoriesFailure = () => ({type: FETCH_CATEGORIES_FAILURE});

export const fetchCategories = () => {
  return async dispatch => {
    try {
      dispatch(fetchCategoriesRequest());
      const response = await axios.get('http://localhost:8000/categories');
      dispatch(fetchCategoriesSuccess(response.data));
    } catch (e) {
      dispatch(fetchCategoriesFailure());
    }
  };
};
