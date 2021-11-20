import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchItem} from "../../store/actions/itemsActions";
import {Box, makeStyles, Paper, Typography} from "@material-ui/core";
import {apiURL} from "../../config";

const useStyles = makeStyles({
    image: {
        width: '150px',
        height: '100%',
    }
});

const Item = ({match}) => {
    const dispatch = useDispatch();
    const item = useSelector(state => state.items.item);
    const classes=useStyles();

    useEffect(() => {
        dispatch(fetchItem(match.params.id));
    }, [dispatch, match.params.id]);

    return item && (
        <Paper component={Box} p={2}>
            <Typography variant="body1">{item.user.name}: {item.user.phone}</Typography>
            <img src={apiURL+'/'+item.image} className={classes.image} alt={item.title} />
            <Typography variant="h4">{item.title}</Typography>
            <Typography variant="body1">{item.description}</Typography>
            <Typography variant="subtitle1">{item.price} KGS</Typography>
        </Paper>
    );
};

export default Item;