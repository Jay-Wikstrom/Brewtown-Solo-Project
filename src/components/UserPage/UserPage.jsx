import React, { useState, useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TableRow, TableHead, Table, Button, makeStyles } from "@material-ui/core";
import { Paper, TableBody, TableCell, TableSortLabel } from '@material-ui/core';
//import { DataGridPro } from '@mui/x-data-grid-pro';
import './UserPage.css';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const ratings = useSelector((store) => store.ratingsReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const [editUsername, setEditUsername] = useState('');
  const [buttonClick, setButtonClick] = useState(true);

  let payload = {}


  useEffect(() => {
    dispatch({
      type: 'FETCH_RATINGS'
    })
  }, [])

  const beerCount = ratings.length;
  const bronzeTier = 20;
  const silverTier = 50;
  const goldTier = 100;
  const platinumTier = 101;
  const bronzeProgress = (ratings.length  / bronzeTier) * 100;
  console.log(bronzeProgress,'******')

  //const beerCount = 12
  // console.log('****************', beerCount)


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
    progressDone: {
      height: 25,
      backgroundColor: 'silver',
      
    },
    progress: {
      height: 25,
      backgroundColor: 'white',
      
    }
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
      return <h4>Rate {bronzeTier - beerCount} more beers to reach the next Silver Tier</h4>
    } else if (beerCount < silverTier) {
      console.log(silverTier - beerCount)
      return <h4>Rate {silverTier - beerCount} more beers to reach the next Gold Tier</h4>
    } else if (beerCount < goldTier) {
      console.log(goldTier - beerCount)
      return <h4>Rate {goldTier - beerCount} more beers to reach the next Platinum Tier</h4>
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

  const progress = (done) => {
    // const [style, setStyle] = useState({})

    // setTimeout(() => {
    //   const newStyle = {
    //     opacity: 1,
    //   }
    //   setStyle(newStyle);
    // }, 1000)

    return (
      <div className={classes.progress}>
        <div className={classes.progressDone} style={{width: `${bronzeProgress}%`}}>10</div>
      </div>
    )
  }

  // const useStyles = makeStyles({
  //       field: {
  //           //TextField padding set to 10
  //           padding: 
  //       }
  //   })
  //   const classes = useStyles()


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
            <TableCell>10 million</TableCell>
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
      <h3>Progress Bar will go here</h3>
      <div>{progress()}</div>
      <h4>{nextTier()}</h4>

      {/* <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
