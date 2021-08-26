import axios from 'axios'

const getAllMovies = () => {
    return axios.get("http://localhost:8001/api/movies");
}
const addMovie = (movie) => {
    return axios.post("http://localhost:8001/api/movies", movie);
}
const deleteMovie = (id) => {
    return axios.delete("http://localhost:8001/api/movies" + "/" + id);
}
const updateMovie = (id, movie) => {
    return axios.put("http://localhost:8001/api/movies" + "/" + id, movie);
}

export default { getAllMovies, addMovie, deleteMovie, updateMovie }