import axios from "axios";
import { takeLatest, put } from 'redux-saga/effects';

function* fetchBreweries() {
    try {
        const response = yield axios.get('/api/breweries')
        console.log('response', response);
        yield put({ type: 'SET_BREWERIES', payload: response.data })
    } catch (error) {
        console.log(error);
    }
}

function* breweriesSaga() {
    yield takeLatest('FETCH_BREWERIES', fetchBreweries);
}
export default breweriesSaga;