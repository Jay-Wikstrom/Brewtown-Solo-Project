import axios from "axios";
import { takeLatest, put } from 'redux-saga/effects';

function* selectBrewery(action) {
    try {
        yield axios.post('api/ratings', action.payload);
        // yield put({
        //     //Fetch from server
        //     type: 'FETCH_BREWERY'
        // })
    } catch (error) {
        console.log(error)
    }
}; //end addItem function

function* addBrewery(action) {
    try {
        yield axios.post('api/ratings', action.payload);
        console.log(action.payload);
        // yield put({
        //     //Fetch from server
        //     type: 'FETCH_BREWERY'
        // })
    } catch (error) {
        console.log(error)
    }
}; //end addItem function

function* brewerySaga() {
    yield takeLatest('SELECT_BREWERY', selectBrewery);
    yield takeLatest('ADD_BREWERY', addBrewery);
}
export default brewerySaga;