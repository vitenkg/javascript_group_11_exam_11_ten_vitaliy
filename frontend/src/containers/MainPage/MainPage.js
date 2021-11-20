import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {Button, CircularProgress, Grid, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchItems} from "../../store/actions/itemsActions";
import ProductItem from "../../components/ProductItem/ProductItem";

const MainPage = () => {
    const dispatch = useDispatch();
    const itemsData = useSelector(state => state.items.items);
    const fetchLoading = useSelector(state => state.items.fetchLoading);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    return (
        <Grid container direction="column">
            <Grid container item direction="column" spacing={2}>
                <Grid item container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h4">All items</Typography>
                    </Grid>
                    <Grid item>
                        <Button coloe="primary" component={Link} to="/items/new">Add</Button>
                    </Grid>
                </Grid>
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