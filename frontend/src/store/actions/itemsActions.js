import axios from "axios";
import {toast} from "react-toastify";
import WarningIcon from '@material-ui/icons/Warning';
import axiosApi from "../../axiosApi";

export const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE';

export const FETCH_ITEM_REQUEST = 'FETCH_ITEM_REQUEST';
export const FETCH_ITEM_SUCCESS = 'FETCH_ITEM_SUCCESS';
export const FETCH_ITEM_FAILURE = 'FETCH_ITEM_FAILURE';

export const CREATE_ITEM_REQUEST = 'CREATE_ITEM_REQUEST';
export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
export const CREATE_ITEM_FAILURE = 'CREATE_ITEM_FAILURE';

export const ERASE_ITEM_REQUEST = 'ERASE_ITEM_REQUEST';
export const ERASE_ITEM_SUCCESS = 'ERASE_ITEM_SUCCESS';
export const ERASE_ITEM_FAILURE = 'ERASE_ITEM_FAILURE';


export const fetchItemsRequest = () => ({type: FETCH_ITEMS_REQUEST});
export const fetchItemsSuccess = products => ({type: FETCH_ITEMS_SUCCESS, payload: products});
export const fetchItemsFailure = () => ({type: FETCH_ITEMS_FAILURE});

export const fetchItemRequest = () => ({type: FETCH_ITEM_REQUEST});
export const fetchItemSuccess = product => ({type: FETCH_ITEM_SUCCESS, payload: product});
export const fetchItemFailure = () => ({type: FETCH_ITEM_FAILURE});

export const createItemRequest = () => ({type: CREATE_ITEM_REQUEST});
export const createItemSuccess = () => ({type: CREATE_ITEM_SUCCESS});
export const createItemFailure = () => ({type: CREATE_ITEM_FAILURE});

export const eraseItemRequest = () => ({type: ERASE_ITEM_REQUEST});
export const eraseItemSuccess = () => ({type: ERASE_ITEM_SUCCESS});
export const eraseItemFailure = () => ({type: ERASE_ITEM_FAILURE});

export const fetchItems = (id) => {
    return async (dispatch) => {
        try {
            let response = null;
            dispatch(fetchItemsRequest());
            if (!id) {
                response = await axiosApi.get('http://localhost:8000/items');
            } else {
                response = await axiosApi.get('http://localhost:8000/items?category=' + id);
            }
            dispatch(fetchItemsSuccess(response.data));
        } catch (e) {
            dispatch(fetchItemsFailure());
            toast.error('Could not fetch items!', {
                theme: 'colored',
                icon: <WarningIcon/>
            });
        }
    };
};

export const fetchItem = id => {
    return async dispatch => {
        try {
            dispatch(fetchItemRequest());
            const response = await axios.get('http://localhost:8000/items/' + id);
            dispatch(fetchItemSuccess(response.data));
        } catch (e) {
            dispatch(fetchItemFailure());
            if (e.response.status === 401) {

            }
        }
    };
};

export const createItem = itemData => {
    return async (dispatch, getState) => {
        try {
            dispatch(createItemRequest());
            await axios.post('http://localhost:8000/items', itemData, {
                    headers: {
                        'Authorization': getState().users.user.token,
                    },

                }
            );
            dispatch(createItemSuccess());
            toast.success('Item created');
        } catch (e) {
            toast.warning('Inputs uncorrect');
            dispatch(createItemFailure());
            throw e;
        }
    };
};

export const eraseItem = id => {
    return async (dispatch, getState) => {
        try {
            dispatch(eraseItemRequest());
            await axiosApi.delete('http://localhost:8000/items/' + id, {
                headers: {
                    'Authorization': getState().users.user.token,
                },
            })
            dispatch(eraseItemSuccess());
            toast.success('Item Erased');
        } catch (e) {
            dispatch(eraseItemFailure())
        }
    };
};