import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MoviesUtil from '../Utils/MoviesUtil';
import { Switch, Route, Link, BrowserRouter, useHistory, NavLink } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, green, pink } from '@material-ui/core/colors';

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
        maxWidth: 345,
        marginLeft: theme.spacing.unit * 4,
        marginBottom: '30px',
    },
    media: {
        height: 140,
    },
});

export default function Movie(props) {
    const classes = useStyles();
    const [movie, setMovie] = useState(props.movieData);
    const history = useHistory();
    const dispatch = useDispatch()

    useEffect(() => {
        setMovie(props.movieData)
    }, [props.movieData])

    const update = () => {
        history.push('/updateMovie/' + movie._id)
    }
    const deleteMovie = async (e) => {
        e.preventDefault();
        await MoviesUtil.deleteMovie(movie.id);
        dispatch({ type: "DELETEMOVIES", payload: movie.id })
    }


    return (
        <Card className={classes.root} theme={theme} >
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={movie.Image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography variant="h5">
                        {movie.Name} <br /> {movie.Premiered.toString().slice(0, 10)} <br />
                    </Typography>
                    <Typography variant="h6">
                        {movie.Genres?.map(genre => genre + " ")}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            &nbsp;&nbsp;&nbsp;<b>Subscriptions watched</b>
                            <ul> {movie.movieSubs.map(movieSub => <li key={movieSub.MemberId}><Link to={"/member/" + movieSub.MemberId}>{movieSub.MemberName}</Link> ,{movieSub.date}</li>)}</ul>
                        </div>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={update}>
                    Edit
                </Button>
                <Button size="small" color="primary" onClick={deleteMovie}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}