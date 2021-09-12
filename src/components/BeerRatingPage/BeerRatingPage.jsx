import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, TextField, Paper, Grid, makeStyles } from '@material-ui/core';
import { useState } from 'react';

function BeerRatingPage() {
    const breweryReducer = useSelector(store => store.breweryReducer);
    const user = useSelector(store => store.user);
    const history = useHistory();

    const [beerInput, setBeerInput] = useState('');
    const [ratingInput, setRatingsInput] = useState('');
    const [typeInput, setTypeInput] = useState('');
    const [notesInput, setNotesInput] = useState('');
    //
    

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({
            type: 'FETCH_BREWERY',
        })
    },[])

    const handleSubmit = () => {
        console.log('click');
        dispatch({
            type: 'ADD_BEER_RATING',
            payload: {
                userId: user.id,
                breweryId: breweryReducer.id,
                beer: beerInput,
                type: typeInput,
                rating: ratingInput,
                notes: notesInput,
            }
            //ratings
        })
        dispatch({
            type: 'ADD_BEER_COUNT'
        })
        history.push('/ratings');
    }

    return (
        <div>
            <h1>{breweryReducer.brewery}</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    type='text'
                    placeholder='Beer'
                    variant="standard"
                    value={beerInput}
                    onChange={e => setBeerInput(e.target.value)}
                />
                <TextField
                    type='number'
                    placeholder='Rating'
                    variant="standard"
                    value={ratingInput}
                    onChange={e => setRatingsInput(e.target.value)}
                />
                <TextField
                    type='text'
                    placeholder='Type'
                    variant="standard"
                    value={typeInput}
                    onChange={e => setTypeInput(e.target.value)}
                />
                <TextField
                    type='text'
                    placeholder='Notes'
                    variant="standard"
                    value={notesInput}
                    onChange={e => setNotesInput(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </form>
        </div>
    )
}
export default BeerRatingPage;