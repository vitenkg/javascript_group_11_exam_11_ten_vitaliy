import React, {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Avatar, Button, Container, Grid, Link, makeStyles, Typography} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../store/actions/usersActions";
import FormElement from "../../components/FormElement/FormElement";

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

const Register = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.registerError);

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
        dispatch(registerUser({...user}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    return (
        <Container component="section" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h6">
                    Sign up
                </Typography>
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
                        error={getFieldError('username')}
                    />

                    <FormElement
                        type="password"
                        autoComlete="new-password"
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={inputChangeHandler}
                        error={getFieldError('password')}
                    />

                    <FormElement
                        type="text"
                        autoComlete="NEW-name"
                        label="Name"
                        name="Name"
                        value={user.name}
                        onChange={inputChangeHandler}
                        error={getFieldError('name')}
                        required
                    />

                    <FormElement
                        type="tel"
                        autoComlete="tel"
                        label="Phone"
                        name="Phone"
                        value={user.phone}
                        onChange={inputChangeHandler}
                        error={getFieldError('phone')}
                        required
                        // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    />
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign up
                        </Button>
                    </Grid>

                    <Grid item container justifyContent="flex-end">
                        <Link component={RouterLink} variant="body2" to="/login">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Register;