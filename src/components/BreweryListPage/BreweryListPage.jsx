import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, makeStyles, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';

function BreweryList({ prop }) {
    const history = useHistory();
    const dispatch = useDispatch();

    //State for selecting and adding brewery
    const [brewery, setBrewery] = useState([]);
    const [selectBrewery, setSelectBrewery] = useState('');
    const [addBrewery, setAddBrewery] = useState('');
    //Limit for making sure the user doesn't go over the VARCHAR in brewery DB.
    const addBreweryLimit = addBrewery.length - 80;

    useEffect(() => {
        //Grab user location data if enabled
        if ('geolocation' in navigator) {
            console.log('geolocation available')
            navigator.geolocation.getCurrentPosition(position => {

                //User latitude and longitude
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                //Convert latitude and longitude to string for brewery api
                let latitude = String(lat);
                let longitude = String(lon);

                //Grab 20 breweries from a list of breweries near the user with a limit of 20.
                axios({
                    method: 'GET',
                    url: 'https://api.openbrewerydb.org/breweries',
                    params: {
                        //Plug in user latitude and longitude from geolocation api
                        by_dist: `${latitude},${longitude}`
                    }

                }).then(response => {
                    const newResult = response.data.map(d => ({
                        name: d.name
                    }))
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

    //Add the brewery from user input
    const handleAdd = () => {
        if (addBrewery.length > 80) {
            alert(`Please delete ${addBreweryLimit} characters inside of your beer add text box`);
        } else if (addBrewery === ''){
            alert('You must enter in a brewery name to add a brewery')
        }
         else {
            dispatch({
                type: 'ADD_BREWERY',
                payload: { brewery: addBrewery }
            })
            history.push('/beer-rating');
        }
    }

    //Select brewery 
    const handleSelect = () => {
        dispatch({
            type: 'SELECT_BREWERY',
            payload: { brewery: selectBrewery }
        })
        history.push('/beer-rating');
    }

    const useStyles = makeStyles(theme => ({
        field: {
            background: 'linear-gradient(45deg, #388e3c 30%, #99eedf 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
        }, 
        form: {
            '& .MuiFormControl-root': {
                width: '95%',
                margin: theme.spacing(1)
            }
        },
        pageContent: {
            width: '75%',
            margin: theme.spacing(1),
            padding: theme.spacing(3)
        },
    }))
    const classes = useStyles();


    return (
        <div>
            
            <center>
                <h2>Select or Add your own Brewery</h2>
                <br />
                <img src="images/brewery.jpeg" /></center>

            <br />
            <br />
            
            
            <center>
                <form className={classes.form}>
                    <Paper className={classes.pageContent}>
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
                            </select>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSelect}
                                className={classes.field}
                            >
                                Select Brewery
                            </Button>
                    </Paper>


                    <Paper className={classes.pageContent}>
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
                    </Paper>
                </form>
            </center>
        </div>
    )
}

export default BreweryList;
