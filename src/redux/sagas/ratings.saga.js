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

function* deleteRating(action) {
    try {
        //Delete from api/shelf server
        yield axios.delete(`api/ratings/${action.payload}`);
        yield put({
            //Fetch from server
            type: 'FETCH_RATINGS'
        })
    } catch (error) {
        console.log(error)
    }
}; //end deleteItem function

function* ratingsSaga(){
    yield takeLatest('FETCH_RATINGS', fetchRatings)
    yield takeLatest('DELETE_RATING', deleteRating)
}
export default ratingsSaga;