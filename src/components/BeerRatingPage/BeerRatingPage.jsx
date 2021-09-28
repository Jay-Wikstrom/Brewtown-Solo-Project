import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, TextField, Paper, Grid, makeStyles } from '@material-ui/core';
import { useState } from 'react';

function BeerRatingPage() {
    //Grab brewery the user selected on the previous page from redux store
    const breweryReducer = useSelector(store => store.breweryReducer);
    const user = useSelector(store => store.user);
    const history = useHistory();

    //State for user inputs of beer, rating, type, and notes
    const [beerInput, setBeerInput] = useState('');
    const [ratingInput, setRatingsInput] = useState('');
    const [typeInput, setTypeInput] = useState('');
    const [notesInput, setNotesInput] = useState('');
    
    //Limit the form inputs so the user doesn't go over the VARCHAR in DB
    const notesLimit = notesInput.length - 500;
    const beerLimit = beerInput.length - 80;
    const typeLimit = notesInput.length - 25;

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({
            type: 'FETCH_BREWERY',
        })
    },[])
   

    //Send the data to Saga if the user fills in inputs with correct data
    const handleSubmit = () => {
        console.log('click');
        if (beerInput === '') {
            alert('Please enter a beer name');
        } else if (ratingInput === '' || ratingInput > 5 || ratingInput < 1){
            alert('Please enter a rating between 1-5');
        } else if (typeInput === ''){
            alert('Please enter a beer type');
        } else if (notesInput.length > 500){
            alert(`Please delete ${notesLimit} characters inside of your notes text box`);
        }
        else if (beerInput.length > 80) {
            alert(`Please delete ${beerLimit} characters inside of your beer text box`);
        }
        else if (typeInput.length > 25) {
            alert(`Please delete ${typeLimit} characters inside of your type text box`);
        }
         else {
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
            })
            history.push('/ratings');
        }
    }
    const useStyles = makeStyles(theme => ({
        root: {
            '& .MuiFormControl-root': {
                width: '95%',
                margin:theme.spacing(1)
            }
        },
        pageContent: {
            margin: theme.spacing(5),
            padding: theme.spacing(3)
        },
        btn: {
            background: 'linear-gradient(45deg, #388e3c 30%, #99eedf 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
        }
    }))
    const classes = useStyles();

    return (
        <div>
            
            <center><h1>{breweryReducer.brewery}</h1></center>
            <br />
            <center><img src="images/brewery.jpeg" /></center>
            <Paper className={classes.pageContent}>
            <form className={classes.root} onSubmit={handleSubmit}>
                <TextField
                    type='text'
                    placeholder='Beer'
                    variant="outlined"
                    value={beerInput}
                    onChange={e => setBeerInput(e.target.value)}
                />
                <TextField
                    type='number'
                    placeholder='Rating'
                    variant="outlined"
                    InputProps={{ inputProps: { min: 1, max: 5 } }}
                    value={ratingInput}
                    onChange={e => setRatingsInput(e.target.value)}
                />
                <TextField
                    type='text'
                    placeholder='Type'
                    variant="outlined"
                    value={typeInput}
                    onChange={e => setTypeInput(e.target.value)}
                />
                <TextField
                    type='text'
                    placeholder='Notes'
                    variant="outlined"
                    value={notesInput}
                    onChange={e => setNotesInput(e.target.value)}
                />
                <br />
                <center><Button
                    className={classes.btn}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Submit
                </Button></center>
            </form>
        </Paper>
        </div>
    )
}
export default BeerRatingPage;