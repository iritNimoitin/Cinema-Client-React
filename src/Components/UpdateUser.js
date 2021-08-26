import { useState } from 'react'
import axios from 'axios'
import React from 'react';
import { Typography, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './Login.css'
import { Switch, Route, Link, BrowserRouter, useHistory, NavLink } from 'react-router-dom'
import notify from '../Services/Notifications';
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import UsersUtil from '../Utils/UsersUtil';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

function UpdateUser(props) {

    const classes = useStyles();
    const [permissions, setPermissions] = React.useState({
        viewSubscriptions: false,
        createSubscriptions: false,
        deleteSubscriptions: false,
        updateSubscriptions: false,
        viewMovies: false,
        createMovies: false,
        deleteMovies: false,
        updateMovies: false,
    });

    const [user, setUser] = useState({})
    const history = useHistory();
    let today = new Date().toISOString().slice(0, 10)
    const dispatch = useDispatch()
    const storeData = useSelector(state => state.users);

    const handleChange = (event) => {
        setPermissions({ ...permissions, [event.target.name]: event.target.checked });
    };
    const cancel = () => {
        history.push('/menu');
    }

    const updateUser = async (e) => {
        e.preventDefault();
        var keys = Object.keys(permissions);
        let updatedPer = [];
        let permissionsFinal = [];
        keys.filter(function (key) {
            if (permissions[key]) {
                updatedPer.push(key);
            }
        });
        if (updatedPer.includes("createSubscriptions" && "deleteSubscriptions" && "updateSubscriptions" && (updatedPer.includes("viewSubscriptions") == false))) {
            updatedPer.push("viewSubscriptions");
        }
        if (updatedPer.includes("createMovies" && "deleteMovies" && "updateMovies" && (updatedPer.includes("viewMovies") == false))) {
            updatedPer.push("viewMovies");
        }
        updatedPer.forEach(permission => {
            const transPermission = permission.substring(0, 1).toUpperCase() + permission.substring(1).replace(/([a-z])([A-Z])/, '$1 $2');
            permissionsFinal.push(transPermission)
        });
        user.permissions = permissionsFinal;
        await UsersUtil.updateUser(user);
        dispatch({ type: "UPDATE", payload: user })
        history.push('/menu');

    }

    useEffect(() => {
        const id = props.match.params.id;
        const u = storeData.users.find(user => user.id == id);
        setUser(u);
        checkPermissions(u);
    }, [])

    const checkPermissions = (u) => {
        setPermissions({
            ...permissions,
            viewSubscriptions: u.permissions.includes("View Subscriptions"),
            createSubscriptions: u.permissions.includes("Create Subscriptions"),
            deleteSubscriptions: u.permissions.includes("Delete Subscriptions"),
            updateSubscriptions: u.permissions.includes("Update Subscriptions"),
            viewMovies: u.permissions.includes("View Movies"),
            createMovies: u.permissions.includes("Create Movies"),
            deleteMovies: u.permissions.includes("Delete Movies"),
            updateMovies: u.permissions.includes("Update Movies")

        });

        // u.permissions.forEach(permission => {
        //     // const transPermission = permission.substring(0, 1).toLowerCase() + permission.substring(1).replace(/ /g, '');
        //     switch (permission) {
        //         case "View Subscriptions":
        //             setPermissions({ ...permissions, viewSubscriptions: true });
        //             break;
        //         case "Create Subscriptions":
        //             setPermissions({ ...permissions, createSubscriptions: true });
        //             break;
        //         case "Delete Subscriptions":
        //             setPermissions({ ...permissions, deleteSubscriptions: true });
        //             break;
        //         case "Update Subscriptions":
        //             setPermissions({ ...permissions, updateSubscriptions: true });
        //             break;
        //     }

        // });
    }

    const { viewSubscriptions, createSubscriptions, deleteSubscriptions, updateSubscriptions, viewMovies, createMovies, deleteMovies, updateMovies } = permissions;

    return (
        <div className="App">

            <div style={{ width: "400px", borderStyle: "solid", borderColor: "black", borderWidth: "1px", justifyContent: "center", padding: "5px" }}>
                <Typography variant="h6">
                    Edit User
                </Typography>
                <br />
                <TextField id="outlined-basic" label="First Name" variant="outlined" value={user.firstName} onChange={e => setUser({ ...user, firstName: e.target.value })} />
                <br /> <br />
                <TextField id="outlined-basic" label="Last Name" variant="outlined" value={user.lastName} onChange={e => setUser({ ...user, lastName: e.target.value })} />
                <br /> <br />
                <TextField id="outlined-basic" label="UserName" variant="outlined" value={user.username} onChange={e => setUser({ ...user, username: e.target.value })} />
                <br /> <br />
                <TextField id="outlined-basic" label="Create Date" variant="outlined" value={user.createDate} />
                <br /> <br />
                <TextField id="outlined-basic" label="Session Time Out" variant="outlined" value={user.session} onChange={e => setUser({ ...user, session: e.target.value })} />
                <br /> <br />
                <br />
                <div className={classes.root}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Permissions</FormLabel><br />
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={viewSubscriptions} onChange={handleChange} name="viewSubscriptions" />}
                                label="View Subscriptions"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={createSubscriptions} onChange={handleChange} name="createSubscriptions" />}
                                label="Create Subscriptions"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={deleteSubscriptions} onChange={handleChange} name="deleteSubscriptions" />}
                                label="Delete Subscriptions"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={updateSubscriptions} onChange={handleChange} name="updateSubscriptions" />}
                                label="Update Subscriptions"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={viewMovies} onChange={handleChange} name="viewMovies" />}
                                label="View Movies"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={createMovies} onChange={handleChange} name="createMovies" />}
                                label="Create Movies"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={deleteMovies} onChange={handleChange} name="deleteMovies" />}
                                label="Delete Movies"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={updateMovies} onChange={handleChange} name="updateMovies" />}
                                label="Update Movies"
                            />
                        </FormGroup>
                    </FormControl>
                    <FormControl required component="fieldset" className={classes.formControl}>
                    </FormControl>
                </div>
                <Button size="small" variant="contained" color="primary" onClick={cancel} >
                    Cancel
                </Button>   &nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="small" variant="contained" color="primary" onClick={updateUser} >
                    Update
                </Button><br />

            </div >
        </div>
    );
}

export default UpdateUser;