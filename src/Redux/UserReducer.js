const UserReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case "REPLACEALL":
            console.log(action.payload);
            return { ...state, users: action.payload }
        case "ADD":
            return { ...state, users: [...state.users, action.payload] }

        case "UPDATE":

            let arr = state.users;
            let index = arr.findIndex(x => x.id == action.payload.id)
            if (index >= 0) {
                arr[index] = action.payload
            }

            return { ...state, users: arr }


        case "DELETE":

            let arr2 = state.users;
            let index2 = arr2.findIndex(x => x.id == action.payload)
            if (index2 >= 0) {
                arr2.splice(index2, 1)
            }

            return { ...state, users: arr2 }


        default:
            return state;
    }
}
export default UserReducer;