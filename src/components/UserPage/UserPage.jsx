import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <table>
        <th>
          
          <tr>Username:</tr>
          
          <tr>Breweries Visited:</tr>
          <tr>Beers Rated:</tr>
          <tr>Tier:</tr>
        </th>

        <td>
          
          <tr>{user.username}</tr>
          
          <tr>2</tr>
          <tr>2</tr>
          <tr>Bronze</tr>
        </td>
        <td>
          <tr><button>Edit</button></tr>
        </td>
      </table>

      <h3>Progress Bar will go here</h3>
      <h4>Rate 18 more beers to reach the next Tier</h4>
      {/* <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
