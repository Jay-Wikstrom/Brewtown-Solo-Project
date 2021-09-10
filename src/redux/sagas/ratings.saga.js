import axios from "axios";
import { takeLatest, put } from 'redux-saga/effects';

function* fetchRatings(){
    try{
        const response = yield axios.get('api/ratings')
        console.log('response', response);
        yield put({ type: 'SET_RATINGS', payload: response.data})
    } catch (error){
        console.log(error);
    }
}

function* addBeerRating(action){
    try {
        yield axios.post('/api/ratings', action.payload);
        console.log(action.payload);
        yield put({
            //Fetch from server
            type: 'FETCH_RATINGS',
            payload: action.payload
        })
    } catch (error) {
        console.log('***********', error)
    }
}

function* deleteRating(action) {
    try {
        yield axios.delete(`api/ratings/${action.payload}`);
        yield put({
            //Fetch from server
            type: 'FETCH_RATINGS'
        })
    } catch (error) {
        console.log(error)
    }
}; 

function* ratingsSaga(){
    yield takeLatest('FETCH_RATINGS', fetchRatings)
    yield takeLatest('DELETE_RATING', deleteRating)
    yield takeLatest('ADD_BEER_RATING', addBeerRating)
}
export default ratingsSaga;