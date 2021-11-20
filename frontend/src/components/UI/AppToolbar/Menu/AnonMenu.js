import React from 'react';
import {Button, Grid, Menu, MenuItem} from "@material-ui/core";
import {Link} from "react-router-dom";
import {logoutUser} from "../../../../store/actions/usersActions";
import {useDispatch, useSelector} from "react-redux";
import {fetchItems} from "../../../../store/actions/itemsActions";

const AnonMenu = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const categoriesMenu = useSelector(state => state.categories.categoriesMenu);

    let categoryName = null;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const requestItems = (data) => {
        let id = null;
        if (data.title !== 'All items') {
            id = data._id;
        }
        categoryName = data.title;
        dispatch(fetchItems(id));
    };

    return (
        <>
            <Button component={Link} to="/register" color="inherit">Sign up</Button>
            <Button component={Link} to="/login" color="inherit">Sign in</Button>
            <Grid item>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    Menu!
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {
                        categoriesMenu.map(category => (
                            <MenuItem
                                key={category._id}
                                onClick={() => requestItems(category)}
                            >
                                {category.title}
                            </MenuItem>
                        ))}
                    <MenuItem onClick={() => dispatch(logoutUser())}>Logout</MenuItem>

                </Menu>
            </Grid>
        </>
    );
};

export default AnonMenu;