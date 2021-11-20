import React, {useState} from 'react';
import {Avatar, Container, Grid, Link, makeStyles, Typography} from "@material-ui/core";
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import FormElement from "../../components/FormElement/FormElement";
import {Link as RouterLink} from "react-router-dom";
import {loginUser} from "../../store/actions/usersActions";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "@material-ui/lab";
import ButtonWithProgress from "../../components/UI/AppToolbar/ButtonWithProgress/ButtonWithProgress";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const LoginUser = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.loginError);
    const loginIn = useSelector(state => state.users.loadingLogin);
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setUser(prevState => ({...prevState, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(loginUser({...user}));
    };

    return (
        <Container component="section" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h6">
                    Sign in
                </Typography>
                {
                    error &&
                    <Alert severity="error" className={classes.alert}>
                        {error.message || error.global}
                    </Alert>
                }
                <Grid
                    component="form"
                    container
                    className={classes.form}
                    onSubmit={submitFormHandler}
                    spacing={2}
                >
                    <FormElement
                        type="text"
                        autoComlete="new-username"
                        label="Username"
                        name="username"
                        value={user.username}
                        onChange={inputChangeHandler}
                    />

                    <FormElement
                        type="password"
                        autoComlete="NEW-username"
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={inputChangeHandler}
                    />

                    <Grid item xs={12}>
                        <ButtonWithProgress
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            loading={loginIn}
                            disabled={loginIn}
                        >
                            Sign in
                        </ButtonWithProgress>
                    </Grid>

                    <Grid item container justifyContent="flex-end">
                        <Link component={RouterLink} variant="body2" to="/register">
                            Or Sign up
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default LoginUser;