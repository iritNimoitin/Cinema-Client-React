const SubscriptionsReducer = (state = { subscriptions: [] }, action) => {
    switch (action.type) {
        case "REPLACEALLSUBS":
            return { ...state, subscriptions: action.payload }
        case "ADD":
            return { ...state, subscriptions: [...state.subscriptions, action.payload] }

        case "UPDATESUBS":

            let arr = state.subscriptions;
            let index = arr.findIndex(x => x.id == action.payload.id)
            if (index >= 0) {
                arr[index] = action.payload
            }

            return { ...state, subscriptions: arr }


        case "DELETESUBS":

            let arr2 = state.subscriptions;
            let index2 = arr2.findIndex(x => x.id == action.payload)
            if (index2 >= 0) {
                arr2.splice(index2, 1)
            }

            return { ...state, subscriptions: arr2 }


        default:
            return state;
    }
}
export default SubscriptionsReducer;