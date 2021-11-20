import {
  FETCH_ITEM_FAILURE,
  FETCH_ITEM_REQUEST, FETCH_ITEM_SUCCESS,
  FETCH_ITEMS_FAILURE,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS
} from "../actions/itemsActions";

const initialState = {
  fetchLoading: false,
  singleLoading: false,
  items: [],
  item: null,
  category: '',
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return {...state, fetchLoading: true};
    case FETCH_ITEMS_SUCCESS:
      return {...state,  fetchLoading: false, items: action.payload};
    case FETCH_ITEMS_FAILURE:
      return {...state, fetchLoading: false};
    case FETCH_ITEM_REQUEST:
      return {...state, singleLoading: true};
    case FETCH_ITEM_SUCCESS:
      return {...state,  singleLoading: false, item: action.payload};
    case FETCH_ITEM_FAILURE:
      return {...state, singleLoading: false};
    default:
      return state;
  }
};

export default itemsReducer;