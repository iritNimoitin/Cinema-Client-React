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
import { useSelector } from "react-redux";
import { Switch, Route, Link, BrowserRouter, useHistory, NavLink } from 'react-router-dom'
import { useDispatch } from "react-redux";
import Movie from '../Components/Movie';
import MoviesUtil from '../Utils/MoviesUtil';
import SubscriptionsUtil from '../Utils/SubscriptionsUtil';
import PermissionsUtil from '../Utils/PermissionsUtil';


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

function AllMovies() {
    const dispatch = useDispatch()

    const storeData = useSelector(state => state.movies);
    const [movies, setMovies] = useState([]);
    const [moviesDisplay, setMoviesDisplay] = useState([]);
    const history = useHistory();

    useEffect(async () => {
        if (storeData.movies.length === 0) {
            let resp1 = await MoviesUtil.getAllMovies();
            let resp2 = await SubscriptionsUtil.getAllSubscriptions();
            let allMovies = resp1.data.splice(0, 20);
            let allSubs = resp2.data;
            let subscriptions = [];
            let moviesSubs = [];
            const allMoviesSubs = allMovies.map(movie => {
                const subs = allSubs.filter(sub => sub.Movies.map(x => x.movieName).includes(movie.Name));

                if (subs) {
                    const transSubs = subs.map(sub => {
                        return {
                            MemberName: sub.MemberName,
                            MemberId: sub.MemberId,
                            date: sub.Movies.find(m => m.movieName === movie.Name).date.toString().slice(0, 10)
                        }
                    })
                    const result = {
                        ...movie,
                        movieSubs: transSubs
                    }
                    return result;
                }
                return {
                    ...movie,
                    movieSubs: []
                }
            });
            setMovies(allMoviesSubs);
            setMoviesDisplay(allMoviesSubs);
            dispatch({ type: "REPLACEALLMOVIES", payload: allMoviesSubs })
        } else {
            setMovies(storeData.movies);
            setMoviesDisplay(storeData.movies);
        }
    }, [storeData.movies.length])

    const add = () => {
        history.push('/addMovie');
    }
    const classes = useStyles();

    const searchData = (e) => {
        let filterMovies = movies.filter(movie => movie.Name.toString().toLowerCase().includes(e.target.value.toLowerCase()));
        setMoviesDisplay(filterMovies);
    }
    return (
        <div className="App">
            <Typography color="primary" variant="h3">
                Movies List
            </Typography><br />
            <form noValidate autoComplete="off">
                <Box style={{ marginLeft: '30px' }} display="flex" justify-content="space-between">
                    <Box style={{ marginRight: '30px' }} display="flex" justify-content="space-between">
                        <TextField id="outlined-basic" label="Search Movie" variant="outlined" onChange={searchData} />
                    </Box>
                    <Button variant="contained" color="secondary" onClick={add}>
                        Add New Movie
                    </Button>
                </Box>
            </form> <br />

            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gridTemplateRows: 'auto auto auto', columnGap: '15px', rowGap: '15px' }}>
                    {
                        moviesDisplay.map((movie, index) => {
                            return <Movie movieData={movie} key={index} />

                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default AllMovies;