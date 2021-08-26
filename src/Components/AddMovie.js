import { useState } from 'react'
import React from 'react';
import { Typography, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
// import './Login.css'
import { Switch, Route, Link, BrowserRouter, useHistory, NavLink } from 'react-router-dom'
import notify from '../Services/Notifications';
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import UsersUtil from '../Utils/UsersUtil';
import MoviesUtil from '../Utils/MoviesUtil';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

function AddMovie() {

    const classes = useStyles();

    const [movie, setMovie] = useState({})
    const history = useHistory();

    const dispatch = useDispatch()
    const storeData = useSelector(state => state.movies);

    const cancel = () => {
        history.push('/menu');
    }

    const addMovie = async (e) => {
        e.preventDefault();
        movie.Genres = movie.Genres.split(", ");
        console.log(movie);
        await MoviesUtil.addMovie(movie);
        dispatch({ type: "ADDMOVIE", payload: movie })
        history.push('/movies');

    }

    return (
        <div className="App">

            <div style={{ width: "400px", borderStyle: "solid", borderColor: "black", borderWidth: "1px", justifyContent: "center", padding: "5px" }}>
                <Typography variant="h6">
                    Add New Movie
                </Typography>
                <br />
                <TextField id="outlined-basic" label="Name" variant="outlined" onChange={e => setMovie({ ...movie, Name: e.target.value })} />
                <br /> <br />
                <TextField id="outlined-basic" label="Genres" variant="outlined" onChange={e => setMovie({ ...movie, Genres: e.target.value })} />
                <br /> <br />
                <TextField id="outlined-basic" label="Image url" variant="outlined" onChange={e => setMovie({ ...movie, Image: e.target.value })} />
                <br /> <br />
                <TextField id="outlined-basic" label="Premiered" type="date" variant="outlined" onChange={e => setMovie({ ...movie, Premiered: e.target.value })} />
                <br /> <br />
                <br />
                <Button size="small" variant="contained" color="primary" onClick={cancel} >
                    Cancel
                </Button>   &nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="small" variant="contained" color="primary" onClick={addMovie} >
                    Save
                </Button><br />

            </div >
        </div>
    );
}

export default AddMovie;