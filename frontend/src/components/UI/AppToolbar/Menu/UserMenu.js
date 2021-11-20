import React from 'react';
import {Button, Grid, Menu, MenuItem} from "@material-ui/core";
import {logoutUser} from "../../../../store/actions/usersActions";
import {useDispatch, useSelector} from "react-redux";
import {fetchItems} from "../../../../store/actions/itemsActions";
import {Link} from "react-router-dom";

const UserMenu = ({user}) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const categoriesMenu = useSelector(state => state.categories.categoriesMenu);


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
        dispatch(fetchItems(id));
    };

    return (
        <Grid container>
            <Grid item>
                <Button color="inherit" component={Link} to="/items/new">Add</Button>
            </Grid>
            <Grid item>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    Hello, {user.username}!
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
        </Grid>);
};

export default UserMenu;