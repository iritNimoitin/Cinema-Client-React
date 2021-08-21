const MoviesReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case "REPLACEALLMOVIES":
            return { ...state, movies: action.payload }
        case "ADD":
            return { ...state, movies: [...state.movies, action.payload] }

        case "UPDATE":

            let arr = state.movies;
            let index = arr.findIndex(x => x.id == action.payload.id)
            if (index >= 0) {
                arr[index] = action.payload
            }

            return { ...state, movies: arr }


        case "DELETE":

            let arr2 = state.movies;
            let index2 = arr2.findIndex(x => x.id == action.payload)
            if (index2 >= 0) {
                arr2.splice(index2, 1)
            }

            return { ...state, movies: arr2 }


        default:
            return state;
    }
}
export default MoviesReducer;