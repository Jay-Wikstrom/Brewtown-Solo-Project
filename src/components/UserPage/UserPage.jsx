import React, { useState, useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TableRow, TableHead, Table, Button, makeStyles } from "@material-ui/core";
import { Paper, TableBody, TableCell, TableSortLabel } from '@material-ui/core';
import './UserPage.css';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const ratings = useSelector((store) => store.ratingsReducer);
  const breweries = useSelector((store) => store.breweriesReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const [editUsername, setEditUsername] = useState('');
  const [buttonClick, setButtonClick] = useState(true);

  let payload = {}


  useEffect(() => {
    dispatch({
      type: 'FETCH_RATINGS'
    })
    dispatch({
      type: 'FETCH_BREWERIES'
    })
  }, [])

  const bronzeTier = 20;
  const silverTier = 50;
  const goldTier = 100;
  const platinumTier = 101;
  const bronzeProgress = (ratings.length  / bronzeTier) * 100;
  const silverProgress = (ratings.length / silverTier) * 100;
  const goldProgress = (ratings.length  / goldTier) * 100;
  const platinumProgress = 100;
  const beerCount = ratings.length
  const breweriesVisited = breweries.length


  const useStyles = makeStyles(theme => ({
    table: {
      marginTop: theme.spacing(3),
      '& tr': {
        fontWeight: '600',
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.success.light,
      },
      '& td': {
        fontWeight: '500',
      },
      '& tr:hover': {
        backgroundColor: '#fffbf2',
        cursor: 'pointer'
      },
    },
    bronzeProgressDone: {
      height: 25,
      backgroundColor: 'yellow',

    },
    bronzeProgress: {
      height: 25,
      backgroundColor: 'white',
    },
    silverProgressDone: {
      height: 25,
      backgroundColor: 'silver',
      
    },
    silverProgress: {
      height: 25,
      backgroundColor: 'white',
    },
    goldProgressDone: {
      height: 25,
      backgroundColor: 'orange',

    },
    goldProgress: {
      height: 25,
      backgroundColor: 'white',
    },
    platinumProgressDone: {
      height: 25,
      backgroundColor: 'purple',

    },
    platinumProgress: {
      height: 25,
      backgroundColor: 'white',
    },
  }))
  const classes = useStyles();

  const handleEdit = () => {
    payload = {
      username: editUsername,
      id: user.id
    }
    dispatch({
      type: 'EDIT',
      payload: payload
    })
  }

  const beerCounter = () => {
    if (beerCount < bronzeTier) {
      console.log('Bronze')
      return <TableCell>Bronze</TableCell>
    } else if (beerCount < silverTier) {
      console.log('Silver')
      return <TableCell>Silver</TableCell>
    }
    else if (beerCount < goldTier) {
      console.log('Gold')
      return <TableCell>Gold</TableCell>
    }
    else {
      console.log('Platinum');
      return <TableCell>Platinum</TableCell>
    }
  }

  const nextTier = () => {
    if (beerCount < bronzeTier){
      console.log(bronzeTier - beerCount)
      return (
        <div className={classes.bronzeProgress}>
          <div className={classes.bronzeProgressDone} style={{ width: `${bronzeProgress}%` }}></div>
          <h4>Rate {bronzeTier - beerCount} more beers to reach the next Silver Tier</h4>
        </div>
      )

    } else if (beerCount < silverTier) {
      console.log(silverTier - beerCount)
      return (
        <div className={classes.silverProgress}>
          <div className={classes.silverProgressDone} style={{ width: `${silverProgress}%` }}></div>
          <h4>Rate {silverTier - beerCount} more beers to reach the next Gold Tier</h4>
        </div>
      )

    } else if (beerCount < goldTier) {
      console.log(goldTier - beerCount)
      return (
        <div className={classes.goldProgress}>
          <div className={classes.goldProgressDone} style={{ width: `${goldProgress}%` }}></div>
          <h4>Rate {goldTier - beerCount} more beers to reach the next Platinum Tier</h4>
        </div>
      )
    }

    else {
      return (
        <div className={classes.platinumProgress}>
          <div className={classes.platinumProgressDone} style={{ width: `${platinumProgress}%` }}></div>
        </div>
      )
    }
  }
  

  const toggleButtonClick = () => {
    setButtonClick(!buttonClick);
  }
  const toggleButton = () => {
    if (buttonClick) {
      return;
    }
    else {
      return (
        <div>
          <input 
            type="text"
            placeholder="edit username"
            value={editUsername}
            onChange={e => setEditUsername(e.target.value)}

          /> 
          <button onClick={() => handleEdit()}>Submit Changes</button>
        </div>
      )
    }
  }


  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>

      <Paper>
        <Table className={classes.table}>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>{user.username}</TableCell>       
          </TableRow>

          
          <TableRow>
            <TableCell>Breweries Visited:</TableCell>
            <TableCell>{breweriesVisited}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Beers Rated:</TableCell>
            <TableCell>{beerCount}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Tier:</TableCell>
            {beerCounter()}
          </TableRow>
        </Table>
      </Paper>

      <Button
        variant="contained"
        onClick={toggleButtonClick}
        //color="secondary"
      >
        Edit User Data
      </Button>

      {toggleButton()}
      <br />
      <br />
      <h4>{nextTier()}</h4>

      {/* <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
