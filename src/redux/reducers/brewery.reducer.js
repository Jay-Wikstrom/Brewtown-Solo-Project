const breweryReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_BREWERY':
            return action.payload
        default:
            return state;
    }

}
export default breweryReducer;