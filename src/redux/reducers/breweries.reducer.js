const breweriesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BREWERIES':
            return action.payload
        default:
            return state;
    }

}
export default breweriesReducer;