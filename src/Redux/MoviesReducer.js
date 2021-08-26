const MoviesReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case "REPLACEALLMOVIES":
            return { ...state, movies: action.payload }
        case "ADDMOVIE":
            return { ...state, movies: [...state.movies, action.payload] }

        case "UPDATEMOVIES":

            let arr = state.movies;
            let index = arr.findIndex(x => x._id == action.payload._id)
            if (index >= 0) {
                arr[index] = action.payload
            }

            return { ...state, movies: arr }


        case "DELETEMOVIES":

            let arr2 = state.movies;
            let index2 = arr2.findIndex(x => x._id == action.payload)
            if (index2 >= 0) {
                arr2.splice(index2, 1)
            }

            return { ...state, movies: arr2 }


        default:
            return state;
    }
}
export default MoviesReducer;