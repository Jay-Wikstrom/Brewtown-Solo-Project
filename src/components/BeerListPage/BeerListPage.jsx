import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { TextField, Container, Select, Button, Grid, InputLabel, FormControl, makeStyles } from '@material-ui/core';

function BeerListPage() {
    const history = useHistory();

    useEffect(() => {
        if ('geolocation' in navigator) {
            console.log('geolocation available')
            navigator.geolocation.getCurrentPosition(position => {

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                let latitude = String(lat);
                console.log(latitude)
                let longitude = String(lon);
                console.log(longitude);

                axios({
                    method: 'GET',
                    url: 'https://api.openbrewerydb.org/breweries',
                    params: {
                        by_dist: `${latitude},${longitude}` //Minneapolis hard code
                    }

                }).then(response => {
                    console.log('axios response', response.data);
                })
                
                
                // const data = { lat, lon }
                // console.log(data)
                
                
                // lat.toString();
                // console.log(lat)
                // const latitude = toString(lat);
                // console.log(latitude);
                // console.log(typeof lon)
                

                // const data = { lat, lon }
                // console.log(data)
                // const options = {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(data)
                // };
                // const response = await fetch('/beer-list', options);
                // const geolocation = await response.json();
                
                // console.log(geolocation);
            })
        } else {
            console.log('geolocation not available')
        }
        // axios({
        //     method: 'GET',
        //     url: 'https://api.openbrewerydb.org/breweries',
        //     params: {
        //         by_dist: `${latitude},${longitude}` //Minneapolis hard code
        //     }

        // }).then(response => {
        //     console.log('axios response', response.data);
        // })
    }, [])


    




    const handleAdd = () => {
        console.log('Handle Submit');
        history.push('/beer-rating');
    }

    const handleSelect = () => {
        console.log('Handle Submit');
        history.push('/beer-rating');
    }

    return (
        <div>
            <h1>This will be my Beer List page</h1>
            <FormControl variant="outlined" className="formInput">
                <Select name="surly" id="brewLocations">
                    <Option value="Surly">Surly</Option>
                    <Option value="Indeed">Indeed</Option>
                </Select>
            </FormControl>
            
            <button onClick={handleSelect}>Add Brewery</button>

            <br />
            <br />
            <br />

            <input 
                type="text"
                placeholder="Add Your Own Brewery"
            />
            <button onClick={handleAdd}>Add Brewery</button>
        </div>
    )
}
export default BeerListPage;