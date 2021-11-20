import { nanoid } from 'nanoid';
import {
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS
} from "../actions/categoriesActions";

const initialState = {
  fetchLoadingCategories: false,
  categories: [],
  categoriesMenu: [],
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return {...state, fetchLoadingCategories: true};
    case FETCH_CATEGORIES_SUCCESS:
      const cat = [...action.payload];
      cat.unshift({title: 'All items', _id: nanoid()});
      return {...state,  fetchLoadingCategories: false, categories: action.payload, categoriesMenu: cat};
    case FETCH_CATEGORIES_FAILURE:
      return {...state, fetchLoading: false};
    default:
      return state;
  }
};

export default categoriesReducer;