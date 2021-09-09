import axios from "axios";
import { takeLatest, put } from 'redux-saga/effects';

function* fetchBrewery(action) {
    try {
        console.log('action payload*********', action.payload.brewery)
        const breweryParams = {
            brewery: action.payload.brewery
        }
        const response = yield axios.get('/api/brewery', { params: breweryParams})
        console.log('response is', response)
        yield put({ type: 'SET_BREWERY', payload: response.data });
    }
    catch (error) {
        console.log('Error in fetch Brewery', error)
    }
}

function* selectBrewery(action) {
    try {
        yield axios.post('/api/brewery', action.payload);
        yield put({
            //Fetch from server
            type: 'FETCH_BREWERY',
            payload: action.payload
        })
    } catch (error) {
        console.log(error)
    }
}; //end addItem function

function* addBrewery(action) {
    try {
        yield axios.post('/api/brewery', action.payload);
        console.log(action.payload);
        yield put({
            //Fetch from server
            type: 'FETCH_BREWERY',
            payload: action.payload
        })
    } catch (error) {
        console.log(error)
    }
}; //end addItem function

function* brewerySaga() {
    yield takeLatest('SELECT_BREWERY', selectBrewery);
    yield takeLatest('ADD_BREWERY', addBrewery);
    yield takeLatest('FETCH_BREWERY', fetchBrewery);
}
export default brewerySaga;