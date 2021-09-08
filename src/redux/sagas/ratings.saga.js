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

function* ratingsSaga(){
    yield takeLatest('FETCH_RATINGS', fetchRatings)
}
export default ratingsSaga;