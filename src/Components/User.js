import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, green, pink } from '@material-ui/core/colors';
import { Switch, Route, Link, BrowserRouter, useHistory, NavLink } from 'react-router-dom'
import { useDispatch } from "react-redux";
import UsersUtil from '../Utils/UsersUtil';


const theme = createTheme({
    spacing: value => value ** 2,
    palette: {
        primary: {
            main: blue[500],
        },
        secondary: {
            main: pink[500],
        },
    },
    button: {
        primary: {
            main: green[500],
        },

    }
});

const useStyles = makeStyles({
    root: {
        minWidth: 350,
        marginLeft: theme.spacing.unit * 4,
        marginBottom: '30px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 22,
    },
    pos: {
        marginBottom: 12,
    },
});
export default function User(props) {
    const classes = useStyles();
    const [user, setUser] = useState(props.userData);
    const history = useHistory();
    const dispatch = useDispatch()

    const bull = <span className={classes.bullet}>•</span>;

    const update = () => {
        history.push('/updateUser/' + user.id)
    }
    const deleteUser = async (e) => {
        e.preventDefault();
        await UsersUtil.deleteUser(user.id);
        dispatch({ type: "DELETE", payload: user.id })
    }

    return (
        <Card theme={theme} className={classes.root} style={{ boxShadow: '2px 2px 4px 4px rgba(0, 0, 255, .7)' }} >
            <CardContent>
                <Typography className={classes.title} color="primary" gutterBottom >
                    {user.firstName}
                </Typography>
                <Typography variant="body2" component="p">
                    {/* {user.lastName ? "LastName : " + user.lastName : null} <br /><br /> */}
                    Last Name :{user.lastName} <br />
                    Username : {user.username}<br />
                    Created Date : {user.createDate} <br />
                    Session Time Out :{user.session}<br />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        &nbsp;&nbsp;&nbsp;<b>Permissions:</b>
                        <ul> {user.permissions.map(permission => <li>{permission}</li>)}</ul><br />
                    </div>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="secondary" onClick={update}>Edit</Button>
                <Button size="small" color="secondary" onClick={deleteUser}>Delete</Button>
            </CardActions>
        </Card>
    );
}

