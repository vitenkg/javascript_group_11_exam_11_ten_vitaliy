import React, {useEffect} from 'react';
import {CircularProgress, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchItems} from "../../store/actions/itemsActions";
import ProductItem from "../../components/ProductItem/ProductItem";
import {fetchCategories} from "../../store/actions/categoriesActions";

const MainPage = () => {
    const dispatch = useDispatch();
    const itemsData = useSelector(state => state.items.items);
    const fetchLoading = useSelector(state => state.items.fetchLoading);

    useEffect(() => {
        dispatch(fetchItems());
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <Grid container direction="column" >
            <Grid container item direction="column" spacing={2}>
                <Grid item>
                    <Grid item container direction="row" spacing={1}>
                        {fetchLoading ? (
                            <Grid container justifyContent="center" alignItems="center">
                                <Grid item>
                                    <CircularProgress/>
                                </Grid>
                            </Grid>
                        ) : itemsData.map(product => (
                            <ProductItem
                                key={product._id}
                                id={product._id}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MainPage;