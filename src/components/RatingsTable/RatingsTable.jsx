import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { Container, Grid, Card, Button, makeStyles } from '@material-ui/core';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

function RatingsPage(){

    const dispatch = useDispatch();
    const ratings = useSelector(store => store.ratingsReducer);

    useEffect(()=>{
        dispatch({
            type: 'FETCH_RATINGS'
        })
    }, [])

    const handleDelete = (id) => {
        console.log(id);
        dispatch({
            type: 'DELETE_RATING',
            payload: id
        })
    }
    

    return (
        
        <div>
            <h1>Brews Rated</h1>

            <table>
                <thead>
                    <th>Brewery</th>
                    <th>Beer</th>
                    <th>Type</th>
                    <th>Rating</th>
                    <th>Notes</th>
                    <th>Date</th>
                </thead>


                <tbody>
                    {ratings.map((rating) => {
                        return (
                            <tr key={rating.id}>
                                <td>
                                    {rating.brewery}
                                </td>
                                <td>
                                    {rating.beer}
                                </td>
                                <td>
                                    {rating.type}
                                </td>
                                
                                <td>
                                    {rating.rating}
                                </td>

                                <td>
                                    {rating.notes}
                                </td>
                                <td>
                                    Date
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(rating.id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            
        </div>
    )
}
export default RatingsPage;