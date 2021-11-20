import React from 'react';
import {Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {createItem} from "../../store/actions/itemsActions";
import ItemForm from "../ItemForm/ItemForm";

const NewProduct = ({history}) => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);

    const onSubmit = async itemData => {
        await dispatch(createItem(itemData));
        history.replace('/');
    };

    return (
        <>
            <Typography variant="h4">New item</Typography>
            <ItemForm
                onSubmit={onSubmit}
                categories={categories}
            />
        </>
    );
};

export default NewProduct;