import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Container, Select, Button, Grid, InputLabel, FormControl, makeStyles } from '@material-ui/core';
//import { makeStyles } from '@material-ui/core/styles';
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

    function fetchBrewery() {
        dispatch({
            type: 'FETCH_BREWERY',
        })
    }

    const addBreweryLimit = addBrewery.length - 80;

    const handleAdd = () => {
        if (addBrewery.length > 80) {
            alert(`Please delete ${addBreweryLimit} characters inside of your beer add text box`);
        } else {
            console.log('Handle Submit');
            console.log(addBrewery)
            dispatch({
                type: 'ADD_BREWERY',
                payload: { brewery: addBrewery }
            })
            history.push('/beer-rating');
        }

    }

    const handleSelect = () => {
        console.log('Handle Submit');
        console.log(selectBrewery)

        dispatch({
            type: 'SELECT_BREWERY',
            payload: { brewery: selectBrewery }
        })
        history.push('/beer-rating');
    }

    const useStyles = makeStyles({
        field: {
            background: 'linear-gradient(45deg, #388e3c 30%, #99eedf 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            // boxShadow: '0 3px 5px 2px #ffffff',
        }
    });
    const classes = useStyles();


    return (
        <div>
            {/* <h1>Select or Add a Brewery</h1> */}

            <img src="images/brewery.jpeg" />
            {/* <h1>{d}</h1> */}

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
                className={classes.field}
            >
                Select Brewery
            </Button>

            {/* <img src="images/brewery.jpeg" /> */}

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
                className={classes.field}
            >
                Add Brewery
            </Button>

            {/* <img src="images/brewery.jpeg" /> */}
        </div>
    )
}

export default BeerListPage;
