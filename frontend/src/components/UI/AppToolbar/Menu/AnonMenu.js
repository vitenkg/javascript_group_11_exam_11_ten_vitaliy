import React from 'react';
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

const AnonMenu = () => {
    return (
        <>
            <Button component={Link} to="/register" color="inherit">Sign up</Button>
            <Button component={Link} to="/login" color="inherit">Sign in</Button>
        </>
    );
};

export default AnonMenu;