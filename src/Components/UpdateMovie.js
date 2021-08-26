import { useState } from 'react'
import React from 'react';
import { Typography, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Switch, Route, Link, BrowserRouter, useHistory, NavLink } from 'react-router-dom'
import notify from '../Services/Notifications';
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import MoviesUtil from '../Utils/MoviesUtil';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

function UpdateMovie(props) {

    const classes = useStyles();

    const [movie, setMovie] = useState({})
    const history = useHistory();

    const dispatch = useDispatch()
    const storeData = useSelector(state => state.movies);


    useEffect(() => {
        const id = props.match.params.id;
        const m = storeData.movies.find(movie => movie._id == id);
        setMovie(m);
    }, [])

    const cancel = () => {
        history.push('/movies');
    }

    const updateMovie = async (e) => {
        e.preventDefault();
        let updatedMovie = { Genres: movie.Genres, Name: movie.Name, Image: movie.Image, Premiered: movie.Premiered }
        console.log(updatedMovie);
        console.log(movie._id);
        await MoviesUtil.updateMovie(movie._id, updatedMovie);
        dispatch({ type: "UPDATEMOVIES", payload: movie })
        history.push('/movies');

    }


    return (
        <div className="App">

            <div style={{ width: "400px", borderStyle: "solid", borderColor: "black", borderWidth: "1px", justifyContent: "center", padding: "5px" }}>
                <Typography variant="h6">
                    Update Movie : {movie.Name}
                </Typography>
                <br />
                <TextField id="outlined-basic" label="Name" variant="outlined" value={movie.Name} onChange={e => setMovie({ ...movie, Name: e.target.value })} />
                <br /> <br />
                <TextField id="outlined-basic" label="Genres" value={movie.Genres} variant="outlined" onChange={e => setMovie({ ...movie, Genres: e.target.value })} />
                <br /> <br />
                <TextField id="outlined-basic" label="Image url" variant="outlined" value={movie.Image} onChange={e => setMovie({ ...movie, Image: e.target.value })} />
                <br /> <br />
                <TextField id="outlined-basic" label="Premiered" type="text" variant="outlined" value={movie.Premiered?.toString().slice(0, 10)} onChange={e => setMovie({ ...movie, Premiered: e.target.value })} />
                <br /> <br />
                <br />
                <Button size="small" variant="contained" color="primary" onClick={cancel} >
                    Cancel
                </Button>   &nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="small" variant="contained" color="primary" onClick={updateMovie} >
                    Update
                </Button><br />

            </div >
        </div>
    );
}

export default UpdateMovie;