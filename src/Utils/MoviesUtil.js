import axios from 'axios'

const getAllMovies = () => {
    return axios.get("http://localhost:8001/api/movies");
}

export default { getAllMovies }