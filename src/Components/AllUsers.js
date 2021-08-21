import { pink, blue } from '@material-ui/core/colors';
import { Typography } from '@material-ui/core';
import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { TextField } from "@material-ui/core";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import UsersUtil from '../Utils/UsersUtil';
import User from './User';
import { useSelector } from "react-redux";
import { Switch, Route, Link, BrowserRouter, useHistory, NavLink } from 'react-router-dom'
import { useDispatch } from "react-redux";


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
});

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginLeft: theme.spacing.unit * 4,
        marginBottom: '30px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    addUser: {
        minWidth: 275,
        marginLeft: theme.spacing.unit * 4,
        marginBottom: '30px',
    }

});

function AllUsers() {
    const dispatch = useDispatch()

    const storeData = useSelector(state => state.users);
    const [users, setUsers] = useState([]);
    const history = useHistory();

    useEffect(async () => {
        if (storeData.users.length === 0) {
            let resp = await UsersUtil.getAllUsersDetails();
            setUsers(resp.data);
            dispatch({ type: "REPLACEALL", payload: resp.data })
        } else {
            setUsers(storeData.users);
        }
    }, [storeData.users.length])

    const add = () => {
        history.push('/addUser');
    }
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <div className="App">
            <Typography color="primary" variant="h3">
                Users List
            </Typography><br />
            <Box style={{ marginLeft: '5px' }} display="flex" justify-content="space-between">
                <Button variant="contained" color="secondary" onClick={add} >
                    Add New User
                </Button>
            </Box><br></br>

            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <div>
                    {
                        users.map((user, index) => {
                            return <User userData={user} key={index} />

                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default AllUsers;
