import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {eraseItem, fetchItem} from "../../store/actions/itemsActions";
import {Box, Button, makeStyles, Paper, Typography} from "@material-ui/core";
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
    const user = useSelector(state => state.users.user)
    const classes=useStyles();

    useEffect(() => {
        dispatch(fetchItem(match.params.id));
    }, [dispatch, match.params.id]);

    let deleteButton = null;

    if (user && item) {
        if (user.username === item.user.username){
            deleteButton = (
                <Button variant="outlined" color="secondary" onClick={() => dispatch(eraseItem(item._id))}>Delete</Button>
            )
        }
    }

    return item && (
        <Paper component={Box} p={2}>
            <Typography variant="body1">{item.user.name}: {item.user.phone}</Typography>
            <img src={apiURL+'/'+item.image} className={classes.image} alt={item.title} />
            <Typography variant="h4">{item.title}</Typography>
            <Typography variant="body1">{item.description}</Typography>
            <Typography variant="subtitle1">{item.price} KGS</Typography>
            {deleteButton}
        </Paper>
    );
};

export default Item;