import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Container, Select, Button, Grid, InputLabel, FormControl, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';

function BeerListPage({ prop }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const [brewery, setBrewery] = useState([]);
    const [selectBrewery, setSelectBrewery] = useState('');
    const [addBrewery, setAddBrewery] = useState('');

    useEffect(() => {
        if ('geolocation' in navigator) {
            console.log('geolocation available')
            navigator.geolocation.getCurrentPosition(position => {

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                let latitude = String(lat);
                let longitude = String(lon);

                axios({
                    method: 'GET',
                    url: 'https://api.openbrewerydb.org/breweries',
                    params: {
                        by_dist: `${latitude},${longitude}`
                    }

                }).then(response => {
                    const newResult = response.data.map(d => ({
                        name: d.name
                    }))
                    console.log(newResult);
                    console.log('axios response', response.data);
                    setBrewery(newResult);
                })
            })
        } else {
            console.log('geolocation not available')
        }

        fetchBrewery()
    }, [])

    function fetchBrewery(){
        dispatch({
            type: 'FETCH_BREWERY'
        })
    }


    const handleAdd = () => {
        console.log('Handle Submit');
        console.log(addBrewery)
        //history.push('/beer-rating');
        dispatch({
            type: 'ADD_BREWERY',
            payload: {brewery: addBrewery}
        })
    }

    const handleSelect = () => {
        console.log('Handle Submit');
        console.log(selectBrewery)

        dispatch({
            type: 'SELECT_BREWERY',
            payload: { brewery: selectBrewery }
        })
        //history.push({
        //pathname: '/beer-rating', 
        //history.push('/beer-rating', { state: selectBrewery });

        //});
        //history.push('/beer-rating');
    }

    const handleNext= () => {
        history.push('/beer-rating');
    }
        

    return (
        <div>
            <h1>This will be my Beer List page</h1>
            <button onClick={handleNext}>Next page</button>
            <br /><br /><br /><br />
            {/* <FormControl variant="outlined" className={classes.input}>
            <InputLabel id="selectBrewery">Select a Brewery</InputLabel> */}
            {/* <label for="brewery">Select Brewery</label> */}
            <select
                id="brewery"
                name="brewery"
                label="selectBrewery"
                onChange={(e) => setSelectBrewery(e.target.value)}

                value={selectBrewery}
            > Select Brewery
                <option value="" select>Select a Brewery</option>
                {brewery.map((brew, i) => {
                    return <option key={i} value={brew.id}>{brew.name}</option>
                })}
                {/* <option value="Surly">Surly</option>
                    <option value="Indeed">Indeed</option> */}
            </select>
            {/* </FormControl> */}

            <Button
                variant="contained"
                color="primary"
                onClick={handleSelect}
            >
                Select Brewery
            </Button>

            <br />
            <br />
            <br />

            <input
                type="text"
                placeholder="Add Your Own Brewery"
                onChange={(e) => setAddBrewery(e.target.value)}
                value={addBrewery}
            />
            <Button 
                variant="contained"
                color="primary"
                onClick={handleAdd}
            >
                Add Brewery
            </Button>
        </div>
    )
}
export default BeerListPage;
