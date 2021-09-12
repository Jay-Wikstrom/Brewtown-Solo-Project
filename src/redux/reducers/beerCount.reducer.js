const beerCountReducer = (state = 0, action) => {
    if (action.type === 'ADD_BEER_COUNT') {
        return state + 1;
    }
    else if (action.type === 'SUBTRACT_BEER_COUNT') {
        return state - 1;
    }
    return state;
};
export default beerCountReducer;