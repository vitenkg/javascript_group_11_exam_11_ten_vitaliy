import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {Button, CircularProgress, Grid, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../store/actions/productsActions";
import ProductItem from "../../components/ProductItem/ProductItem";

const MainPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const fetchLoading = useSelector(state => state.products.fetchLoading);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <Grid container direction="column">
            {/*<Grid container item spacing={2}>*/}
            {/*    <Grid item>*/}
            {/*        <ul>*/}
            {/*            <li><p>All items</p></li>*/}
            {/*        </ul>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
            <Grid container item direction="column" spacing={2}>
                <Grid item container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h4">All items</Typography>
                    </Grid>
                    <Grid item>
                        <Button coloe="primary" component={Link} to="/products/new">Add</Button>
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
                        ) : products.map(product => (
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