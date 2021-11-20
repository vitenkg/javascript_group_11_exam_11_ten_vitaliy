import React from 'react';
import {AppBar, Grid, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import UserMenu from "./Menu/UserMenu";
import AnonMenu from "./Menu/AnonMenu";

const useStyles = makeStyles(theme => ({
  mainLink: {
    color: "inherit",
    textDecoration: 'none',
    '$:hover': {
      color: 'inherit'
    }
  },
  staticToolbar: {
    marginBottom: theme.spacing(2)
  }
}));

const AppToolbar = () => {
  const classes = useStyles();
  const user = useSelector(state => state.users.user);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">
                <Link to="/" className={classes.mainLink}>Flea Market</Link>
              </Typography>
            </Grid>
            <Grid item>
              {user ? (
                  <UserMenu
                  user={user}
                  />
              ) : (
                  <AnonMenu/>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

export default AppToolbar;